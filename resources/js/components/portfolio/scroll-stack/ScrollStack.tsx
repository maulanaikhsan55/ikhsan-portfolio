import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    // Store initial positions to avoid reading from DOM during animation (which causes jitter/feedback loops)
    const initialCardPositionsRef = useRef<number[]>([]);
    const lastTransformsRef = useRef(new Map<number, any>());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller!.scrollTop,
                containerHeight: scroller!.clientHeight,
                scrollContainer: scroller!
            };
        }
    }, [useWindowScroll]);

    // Helper to get absolute position relative to document top
    const getAbsoluteTop = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
    };

    // Pre-calculate positions to avoid layout thrashing and feedback loops
    const cachePositions = useCallback(() => {
        if (!cardsRef.current.length) return;

        // Reset transforms temporarily to get true layout positions
        cardsRef.current.forEach(card => {
            card.style.transform = '';
        });

        initialCardPositionsRef.current = cardsRef.current.map(card => {
            if (useWindowScroll) {
                return getAbsoluteTop(card);
            } else {
                return card.offsetTop;
            }
        });
    }, [useWindowScroll]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        // If we haven't cached positions yet or they seem invalid, try to cache (fail-safe)
        if (initialCardPositionsRef.current.length !== cardsRef.current.length) {
            cachePositions();
        }

        const endElement = useWindowScroll
            ? (document.querySelector('.scroll-stack-end') as HTMLElement)
            : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement);

        // This one changes with scroll, so we can't cache it easily unless we subtract scrollTop
        // But endElement is usually static in flow.
        // Better to use cached position for endElement too if possible, but let's stick to simple efficient reads for now.
        // Actually, `endElement` might move if content above it resizes, but assuming static portfolio:
        let endElementTop = 0;
        if (endElement) {
            if (useWindowScroll) {
                const rect = endElement.getBoundingClientRect();
                // Current visual position + scroll = document position. 
                // Since endElement DOES NOT have transform applied by us, this is safe-ish.
                endElementTop = rect.top + window.scrollY;
            } else {
                endElementTop = endElement.offsetTop;
            }
        }

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // USE CACHED POSITION
            const cardTop = initialCardPositionsRef.current[i];

            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                // Determine which card is "active" based on scroll position vs cached positions
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = initialCardPositionsRef.current[j];
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            // No rounding for maximum smoothness
            const newTransform = {
                translateY: translateY,
                scale: scale,
                rotation: rotation,
                blur: blur
            };

            // Always update if we are scrolling - no thresholding to avoid "micro-stutter"
            // DOM updates are cheap enough for just transforms on a few cards.
            const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
            const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

            card.style.transform = transform;
            card.style.filter = filter;
            card.style.zIndex = `${i + 1}`;

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData,
        cachePositions
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                gestureOrientation: 'vertical',
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075
            });

            lenis.on('scroll', handleScroll);

            const raf = (time: number) => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            return lenis;
        }
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        ) as HTMLElement[];

        cardsRef.current = cards;

        // Initial cache of positions
        cachePositions();

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
            card.style.position = 'relative'; // Ensure relative
        });

        setupLenis();
        updateCardTransforms();

        // Handle resize to update cached positions
        const handleResize = () => {
            cachePositions();
            updateCardTransforms();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            initialCardPositionsRef.current = [];
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        cachePositions
    ]);

    return (
        <div
            className={`scroll-stack-scroller ${className}`.trim()}
            ref={scrollerRef}
            data-window-scroll={useWindowScroll.toString()}
        >
            <div className="scroll-stack-inner">
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
