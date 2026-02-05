import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    Github as GithubIcon,
    Calendar,
    User,
    Tag,
    ChevronRight,
    CheckCircle2,
    Briefcase,
    Zap
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Magnetic, FloatingDock, TiltCard } from '@/components/portfolio/premium-ui';
import { useTranslation } from '@/hooks/useTranslation';

interface Project {
    id: number;
    slug: string;
    title: string;
    description: string;
    long_description: string;
    image: string;
    category: string;
    tech: string[];
    year: string;
    duration: string;
    client: string;
    role: string;
    live_url?: string;
    github_url?: string;
    features: string[];
    screenshots: string[];
    challenges: string;
    solution: string;
    impact?: string;
    tools?: string[];
    awards?: string;
    views_count?: number;
}

export default function ProjectDetail({ project }: { project: Project }) {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll(); // Use global scroll for the progress bar

    const { scrollYProgress: localScroll } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageScale = useTransform(localScroll, [0, 1], [1, 1.2]);
    const headerOpacity = useTransform(localScroll, [0, 0.5], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const stagger: any = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const metaItems = [
        { icon: Calendar, label: t.projectDetail.meta.year, value: project.year },
        { icon: User, label: t.projectDetail.meta.client, value: project.client },
        { icon: Briefcase, label: t.projectDetail.meta.role, value: project.role },
        { icon: Tag, label: t.projectDetail.meta.duration, value: project.duration },
    ];

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 selection:bg-violet-200" ref={containerRef}>
            <Head>
                <title>{`${project.title} | Case Study`}</title>
                <meta name="description" content={project.description} />
                <meta property="og:title" content={`${project.title} - Case Study by Maulana Muhammad Ikhsan`} />
                <meta property="og:image" content={project.image} />
            </Head>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-violet-600 z-[100] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Top Navigation */}
            <nav className="fixed top-0 inset-x-0 z-50 p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
                <Magnetic>
                    <Link
                        href="/"
                        className="pointer-auto flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl group shadow-xl pointer-events-auto"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t.projectDetail.backToHub}</span>
                    </Link>
                </Magnetic>
            </nav>

            {/* Hero Header Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-zinc-950/20 to-transparent" />
                </motion.div>

                <motion.div
                    style={{ opacity: headerOpacity }}
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="relative z-10 text-center max-w-4xl px-6"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{project.category}</span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto"
                    >
                        {project.description}
                    </motion.p>
                </motion.div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-32 relative">
                {/* Meta Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 border-b border-zinc-100 dark:border-zinc-900 pb-20">
                    {metaItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex items-center gap-3 text-violet-600 mb-2">
                                <item.icon size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                            <p className="text-xl font-black uppercase tracking-tight">{item.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Left Column: Context */}
                    <div className="lg:col-span-8 space-y-32">
                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">{t.projectDetail.narrative}</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium whitespace-pre-line">
                                    {project.long_description}
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">{t.projectDetail.coreImplementation}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.features.map((feature, i) => (
                                    <TiltCard key={i}>
                                        <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex items-start gap-5">
                                            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                                                <Zap size={20} className="text-white" />
                                            </div>
                                            <p className="text-sm md:text-base font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-tight leading-tight">
                                                {feature}
                                            </p>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="p-12 bg-zinc-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <ChevronRight size={100} />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{t.projectDetail.challenge}</h3>
                                    <p className="text-zinc-400 leading-relaxed font-medium">{project.challenges}</p>
                                </div>
                                <div className="p-12 bg-violet-600 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <CheckCircle2 size={100} />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{t.projectDetail.solution}</h3>
                                    <p className="text-violet-100 leading-relaxed font-medium">{project.solution}</p>
                                </div>
                            </div>
                        </section>

                        {/* Impact Section */}
                        {project.impact && (
                            <section>
                                <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 text-emerald-600">{t.projectDetail.impact}</h2>
                                <div className="p-10 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-[3rem]">
                                    <p className="text-xl text-zinc-600 dark:text-emerald-100 leading-relaxed font-bold">
                                        "{project.impact}"
                                    </p>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Stack & Links */}
                    <aside className="lg:col-span-4 space-y-16">
                        <div className="sticky top-32">
                            <section className="mb-12">
                                <h3 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.3em] mb-8">{t.projectDetail.techStack}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {project.tools && project.tools.length > 0 && (
                                <section className="mb-12">
                                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Tools</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tools.map(t => (
                                            <span key={t} className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {project.awards && (
                                <section className="mb-12">
                                    <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-6">Awards</h3>
                                    <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                                        <p className="text-sm font-bold text-amber-700 dark:text-amber-200">
                                            {project.awards}
                                        </p>
                                    </div>
                                </section>
                            )}

                            <section className="space-y-6">
                                {project.live_url && (
                                    <Magnetic>
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            className="flex items-center justify-between w-full h-20 px-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] group"
                                        >
                                            <span className="font-black uppercase tracking-widest text-xs">{t.projectDetail.liveSite}</span>
                                            <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </a>
                                    </Magnetic>
                                )}
                                {project.github_url && (
                                    <Magnetic>
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            className="flex items-center justify-between w-full h-20 px-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-[2rem] group"
                                        >
                                            <span className="font-black uppercase tracking-widest text-xs">{t.projectDetail.sourceCode}</span>
                                            <GithubIcon size={24} className="group-hover:scale-110 transition-transform" />
                                        </a>
                                    </Magnetic>
                                )}
                            </section>
                        </div>
                    </aside>
                </div>

                {/* Screenshots Gallery */}
                <section className="mt-48">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-center">
                        {t.projectDetail.visualDeepDive.title1} <br />
                        <span className="text-violet-600">{t.projectDetail.visualDeepDive.title2}</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {project.screenshots.map((shot, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-900 shadow-2xl group ${i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-video'
                                    }`}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    src={shot}
                                    alt={`Screenshot ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Next Project Footer CTA */}
                <section className="mt-48 pt-32 border-t border-zinc-100 dark:border-zinc-900 text-center">
                    <p className="text-[10px] font-black text-violet-600 uppercase tracking-[0.5em] mb-12">{t.projectDetail.nextProject.label}</p>
                    <Magnetic>
                        <Link
                            href="/"
                            className="text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-violet-600 transition-colors inline-block"
                        >
                            {t.projectDetail.nextProject.link.split(' ')[0]} <br /> {t.projectDetail.nextProject.link.split(' ').slice(1).join(' ')}
                        </Link>
                    </Magnetic>
                </section>
            </main>

            <FloatingDock />
        </div>
    );
}
