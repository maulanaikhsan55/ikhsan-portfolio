import { motion, useScroll, useTransform, useSpring, useMotionValue, type Variants, AnimatePresence } from 'framer-motion';
import { Home, FolderCode, User, Briefcase, Mail, Github, Linkedin, Instagram, Sun, Moon, FileText } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const icons = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: FolderCode, label: 'Projects', href: '#projects' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Expertise', href: '#expertise' },
    { icon: Mail, label: 'Contact', href: 'mailto:maulanamuhammadikhsanxap2@gmail.com' },
];

const socialIcons = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/maulanamuhammadikhsan' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/maulanamuhammadikhsan' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/' },
];

export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.35);
        y.set(middleY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}

import { themeConfig } from '@/lib/theme-config';

// ...

export function ThemeToggle({ color }: { color?: string }) {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const themeParams = themeConfig[color || 'violet'] || themeConfig.violet;

    // Only render after mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);

        // Check localStorage first, then system preference, default to dark
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let initialTheme: 'light' | 'dark';
        if (savedTheme) {
            initialTheme = savedTheme;
        } else if (systemPrefersDark) {
            initialTheme = 'dark';
        } else {
            initialTheme = 'dark'; // Default to dark for this portfolio
        }

        setTheme(initialTheme);

        // Apply the theme immediately
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Add transition class for smooth theme change
        document.documentElement.classList.add('theme-transition');

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', newTheme);

        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    // Don't render until mounted to avoid hydration issues
    if (!mounted) {
        return (
            <div className="p-3 w-[44px] h-[44px]" />
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-3 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

// Modern Language Switcher Component
export function LanguageSwitcher() {
    const [mounted, setMounted] = useState(false);
    const [language, setLanguageState] = useState<'en' | 'id'>('id');

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem('language') as 'en' | 'id' | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
            setLanguageState(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'id' ? 'en' : 'id';
        setLanguageState(newLang);
        localStorage.setItem('language', newLang);
        document.documentElement.lang = newLang;
        // Trigger a re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
    };

    if (!mounted) {
        return <div className="w-[72px] h-[44px]" />;
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="relative flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
            aria-label={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={language}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                >
                    <span className="text-lg leading-none">
                        {language === 'id' ? '🇮🇩' : '🇺🇸'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                        {language === 'id' ? 'ID' : 'EN'}
                    </span>
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}

export function FloatingDock({ color, cvUrl }: { color?: string, cvUrl?: string }) {
    const [scrolled, setScrolled] = useState(false);
    const themeParams = themeConfig[color || 'violet'] || themeConfig.violet;

    const allIcons = [...icons];
    if (cvUrl) {
        allIcons.push({ icon: FileText, label: 'CV/Resume', href: cvUrl });
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 150);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{
                y: scrolled ? 0 : 100,
                opacity: scrolled ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 p-2 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/50 rounded-2xl shadow-2xl shadow-black/10"
            style={{ maxWidth: 'calc(100vw - 2rem)' }}
        >
            <div className="flex items-center gap-1 pr-2 border-r border-zinc-200 dark:border-zinc-800">
                {allIcons.map((item) => (
                    <Magnetic key={item.label}>
                        <motion.a
                            href={item.href}
                            target={item.label === 'CV/Resume' ? "_blank" : "_self"}
                            className={`group relative p-3 text-zinc-500 hover:${themeParams.text} transition-colors block`}
                        >
                            <item.icon size={20} />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest">
                                {item.label}
                            </span>
                        </motion.a>
                    </Magnetic>
                ))}
            </div>

            <div className="flex items-center gap-1 px-1 border-r border-zinc-200 dark:border-zinc-800">
                {socialIcons.map((item) => (
                    <Magnetic key={item.label}>
                        <motion.a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors block"
                        >
                            <item.icon size={18} />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest">
                                {item.label}
                            </span>
                        </motion.a>
                    </Magnetic>
                ))}
            </div>

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-1 pl-1">
                <Magnetic>
                    <LanguageSwitcher />
                </Magnetic>
                <Magnetic>
                    <ThemeToggle color={color} />
                </Magnetic>
            </div>
        </motion.div>
    );
}

export function Marquee({ items, color }: { items: string[], color?: string }) {
    const themeParams = themeConfig[color || 'violet'] || themeConfig.violet;
    return (
        <div className="relative w-full overflow-hidden py-10">
            <motion.div
                style={{ willChange: 'transform' }} // ✅ Performance optimization
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear'
                }}
                className="flex whitespace-nowrap gap-10 pr-10 w-max"
            >
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className={`text-4xl md:text-6xl font-black text-zinc-200 dark:text-zinc-800 hover:${themeParams.text} transition-colors uppercase tracking-tight`}
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`${className} max-w-full`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="w-full max-w-full"
            >
                {children}
            </div>
        </motion.div>
    );
}

// ScrollStack Components for Sticky Card Effect
interface ScrollStackItemProps {
    children: React.ReactNode;
    index: number;
    total: number;
}

export function ScrollStackItem({ children, index, total }: ScrollStackItemProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // Scale decreases slightly as the card scrolls away
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    // Brightness decreases as the card scrolls away
    const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale,
                filter: useTransform(brightness, (v) => `brightness(${v})`),
            }}
            className="scroll-stack-card sticky w-full max-w-full overflow-visible"
        // Each card sticks at a slightly different top offset for the stacking effect
        // starting from ~10% viewport height + 20px per card
        >
            <div style={{ top: `calc(10vh + ${index * 25}px)` }} className="sticky w-full max-w-full">
                {children}
            </div>
        </motion.div>
    );
}

interface ScrollStackProps {
    children: React.ReactNode;
}

export function ScrollStack({ children }: ScrollStackProps) {
    return (
        <div className="scroll-stack-container relative pb-[30vh] w-full max-w-full overflow-hidden">
            {children}
        </div>
    );
}

