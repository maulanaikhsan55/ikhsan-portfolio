import { Head, Link, useForm } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, type Variants, AnimatePresence } from 'framer-motion';
import { LiveClock } from '@/components/portfolio/LiveClock';
import { useEffect, useRef, useState } from 'react';
import {
    Github,
    Linkedin,
    Instagram,
    Mail,
    ExternalLink,
    ArrowRight,
    ArrowDownRight,
    Code2,
    Palette,
    Database,
    Globe,
    ChevronDown,
    Sparkles,
    Zap,
    Monitor,
    Moon,
    Sun,
    MapPin,
    GraduationCap,
    Cpu,
    Workflow,
    User,
    CheckCircle2,
    Briefcase,
    Award,
    Clock,
    Search,
    PenTool,
    Settings,
    ArrowUpRight,
    Fingerprint,
} from 'lucide-react';
import { FloatingDock, Marquee, Magnetic, TiltCard } from '@/components/portfolio/premium-ui';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';


// Lazy load 3D Lanyard component (client-side only)


// Types
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
    featured?: boolean;
}

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    company_logo?: string;
    desc: string;
    achievements: string[];
}

interface Skill {
    id: number;
    title: string;
    description: string;
    items: string[];
    icon: string;
}

interface Certification {
    id: number;
    name: string;
    org: string;
    period: string;
    score: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    image?: string;
    rating: number;
}

interface HomeProps {
    projects: Project[];
    experiences: Experience[];
    skills: Skill[];
    certifications: Certification[];
    testimonials: Testimonial[];
    settings: {
        available_for_work?: string;
        site_name?: string;
        full_name?: string;
        job_title?: string;
        hero_description?: string;
        about_text?: string;
        linkedin_url?: string;
        github_url?: string;
        instagram_url?: string;
        primary_color?: string;
        profile_photo?: string;
        cv_file?: string;
    };
}

// Icon mapper for dynamic icons
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'Settings': return <Settings className={className} />;
        case 'Code2': return <Code2 className={className} />;
        case 'PenTool': return <PenTool className={className} />;
        case 'Database': return <Database className={className} />;
        default: return <Settings className={className} />;
    }
};

const techNames = [
    'Laravel 11', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Inertia.js',
    'TypeScript', 'Next.js', 'MySQL', 'Redis', 'Vite', 'Node.js', 'Git',
    'Docker', 'AWS', 'Postman', 'Figma', 'Tableau', 'Excel Macro'
];

// Animation variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

import { themeConfig } from '@/lib/theme-config';

// ... (existing imports)

// Helpers
function getTheme(color?: string) {
    return themeConfig[color || 'violet'] || themeConfig.violet;
}

// Components

// Reusable Premium Reveal Effect
function RevealOnScroll({ children, delay = 0, className = "", width = "fit-content" }: { children: React.ReactNode, delay?: number, className?: string, width?: "fit-content" | "100%" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
            style={{ width, willChange: "transform, opacity, filter" }}
        >
            {children}
        </motion.div>
    );
}

function BentoSection({ settings }: { settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

    return (
        <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto overflow-hidden" id="about">
            <motion.div style={{ scale }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Large Bio Card */}
                <motion.div style={{ y: y1 }} className="md:col-span-8">
                    <TiltCard className="h-full p-16 bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between shadow-2xl shadow-black/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity overflow-hidden w-full h-full flex justify-end items-start pointer-events-none">
                            {settings?.profile_photo ? (
                                <img src={settings.profile_photo} className="w-64 h-64 object-cover rounded-full grayscale opacity-50 -translate-y-12 translate-x-12" alt="" />
                            ) : (
                                <Cpu size={200} className="translate-x-8" />
                            )}
                        </div>
                        <div className="max-w-2xl relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex items-center gap-3 ${theme.text} mb-8`}
                            >
                                <Zap size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{t.about.strategicMission}</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-10 leading-[0.85]"
                            >
                                {t.about.title1} <br />
                                <span className="text-zinc-300 dark:text-zinc-700">{t.about.title2}</span> <br />
                                {t.about.title3}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium"
                            >
                                {settings?.about_text || t.about.description}
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-16 flex flex-wrap gap-4 relative z-10"
                        >
                            {t.about.tags.map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className={`px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-zinc-100 dark:border-zinc-700 hover:${theme.border} transition-colors cursor-default`}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                    </TiltCard>
                </motion.div>

                {/* Performance Metric Card */}
                <motion.div style={{ y: y2 }} className="md:col-span-4">
                    <TiltCard className={`h-full p-12 ${theme.bg} rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl ${theme.shadow} relative overflow-hidden group`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 block mb-8">{t.about.impactMeasurement}</span>
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="text-8xl font-black tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-700"
                            >
                                57%
                            </motion.div>
                            <p className="text-sm font-bold uppercase tracking-widest text-white/80">{t.about.reduction} <br />{t.about.calculationErrors}</p>
                        </div>
                        <div className="relative z-10 pt-12">
                            <div className="h-px bg-white/20 mb-6" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{t.about.case}</p>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Tech Stack Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-4"
                >
                    <TiltCard className="h-full p-12 bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/5 flex flex-col justify-between">
                        <div>
                            <span className={`text-[10px] font-black ${theme.text} uppercase tracking-[0.3em] block mb-12`}>{t.about.systemsMastery}</span>
                            <div className="space-y-8">
                                {[
                                    { name: t.about.skills.sap, level: 90 },
                                    { name: t.about.skills.zahir, level: 95 },
                                    { name: t.about.skills.sql, level: 92 }
                                ].map((skill, i) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                                            <span className="text-zinc-900 dark:text-white">{skill.name}</span>
                                            <span className={theme.text}>{skill.level}%</span>
                                        </div>
                                        <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: i * 0.15, ease: "circOut" }}
                                                className={`h-full ${theme.bg}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="mt-12 text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.about.enterpriseReadiness}</p>
                    </TiltCard>
                </motion.div>

                {/* Achievement Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="md:col-span-8"
                >
                    <TiltCard className="h-full p-16 bg-zinc-900 dark:bg-black rounded-[3.5rem] text-white flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <motion.div
                                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.bg}/20 blur-[100px] rounded-full`}
                            />
                            <motion.div
                                animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                                className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-blue-600/20 blur-[80px] rounded-full"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="max-w-md">
                                <span className={`text-[10px] font-black ${theme.textLight} uppercase tracking-[0.4em] block mb-8`}>{t.about.competitiveEdge}</span>
                                <motion.h3
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className={`text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-10 group-hover:${theme.textLight} transition-colors duration-500`}
                                >
                                    Innovillage <br />Top 165 <span className="text-zinc-700">{t.about.achievementRegion}</span>
                                </motion.h3>
                                <p className="text-zinc-400 font-medium text-lg">
                                    {t.about.fundingDesc}
                                </p>
                            </div>
                            <motion.div
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full h-40 w-40 self-center md:self-auto shrink-0"
                            >
                                <Award size={48} className={`${theme.textLight} mb-2`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{t.about.funding}</span>
                            </motion.div>
                        </div>
                    </TiltCard>
                </motion.div>
            </motion.div>
        </section>
    );
}

function ExpertiseSection({ skills, settings }: { skills: Skill[], settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();

    return (
        <section id="expertise" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
                    <RevealOnScroll className="md:max-w-xl">
                        <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.5em] block mb-6`}>{t.expertise.sectionLabel}</span>
                        <h2 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.85]">
                            {t.expertise.title1} <br /><span className={theme.text}>{t.expertise.title2}</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1} className="max-w-sm">
                        <p className="text-zinc-500 font-medium text-lg">
                            {t.expertise.description}
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((item, i) => (
                        <TiltCard key={i}>
                            <RevealOnScroll delay={i * 0.1} width="100%" className="h-full">
                                <div className={`h-full p-12 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl hover:${theme.shadow} transition-all duration-700 group flex flex-col justify-between`}>
                                    <div>
                                        <motion.div
                                            whileHover={{ rotate: 10 }}
                                            className={`w-16 h-16 ${theme.bgSoft} dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-10 group-hover:${theme.bg} transition-colors duration-500`}
                                        >
                                            <div className={`group-hover:text-white transition-colors duration-500 ${theme.text}`}>
                                                <IconComponent name={item.icon} />
                                            </div>
                                        </motion.div>
                                        <h3 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white uppercase tracking-tight leading-none">{item.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-12 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-8 border-t border-zinc-50 dark:border-zinc-800">
                                        {item.items.map((skill, idx) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + idx * 0.05 }}
                                                className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 text-[9px] font-black rounded-lg uppercase tracking-widest"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineSection({ experiences, settings }: { experiences: Experience[], settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();

    return (
        <section id="experience" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/3">
                        <RevealOnScroll className="sticky top-32">
                            <span className={`${theme.text} text-xs font-bold uppercase tracking-[0.3em] block mb-4`}>{t.experience.sectionLabel}</span>
                            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-8 tracking-tighter">
                                {t.experience.title1} <br /><span className={theme.text}>{t.experience.title2}</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-sm">
                                {t.experience.description}
                            </p>
                            <a
                                href={settings?.cv_file || "/resume"}
                                target={settings?.cv_file ? "_blank" : "_self"}
                                className={`group inline-flex items-center gap-4 text-zinc-900 dark:text-white font-black uppercase text-sm tracking-widest hover:${theme.text} transition-colors`}
                            >
                                {t.experience.viewCV}
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center"
                                >
                                    <ArrowRight size={16} />
                                </motion.div>
                            </a>
                        </RevealOnScroll>
                    </div>
                    <div className="lg:w-2/3 space-y-16">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="relative pl-12 border-l-2 border-zinc-100 dark:border-zinc-800 pb-12 last:pb-0 group"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                                    className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full ${theme.bg} border-4 border-white dark:border-zinc-950 shadow-lg ${theme.shadow}`}
                                />
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 + 0.1 }}
                                        className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight"
                                    >
                                        {exp.role}
                                    </motion.h3>
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-4 py-2 bg-zinc-50 dark:bg-zinc-900 ${theme.text} text-xs font-black rounded-full border border-zinc-100 dark:border-zinc-800`}
                                    >
                                        {exp.period}
                                    </motion.span>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    {exp.company_logo && (
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex-shrink-0 bg-white p-1">
                                            <img src={exp.company_logo} alt={exp.company} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <h4 className="text-xl font-bold text-zinc-400 uppercase tracking-widest">{exp.company}</h4>
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-2xl">
                                    {exp.desc}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {exp.achievements.map((ach, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 + 0.3 + idx * 0.1 }}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400"
                                        >
                                            <CheckCircle2 size={12} className={theme.text} />
                                            {ach}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}



function ProcessSection({ settings }: { settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();

    const stepIcons = [
        <Search size={32} />,
        <Workflow size={32} />,
        <Zap size={32} />,
        <Monitor size={32} />
    ];

    return (
        <section id="process" className="py-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white relative overflow-hidden group border-y border-zinc-100 dark:border-zinc-900">
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] ${theme.fromOp10} via-transparent to-transparent opacity-30`} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
                    <div>
                        <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.5em] block mb-6`}>{t.process.sectionLabel}</span>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                            {t.process.title1} <br /><span className={theme.text}>{t.process.title2}</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-200 dark:border-white/10 rounded-[4rem] overflow-hidden shadow-2xl bg-white dark:bg-transparent">
                    {t.process.steps.map((step, i) => (
                        <RevealOnScroll
                            key={i}
                            delay={i * 0.1}
                            className="p-16 border-r border-b lg:border-b-0 last:border-r-0 border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group relative overflow-hidden"
                        >
                            <div className={`absolute bottom-0 right-0 p-8 text-zinc-100 dark:text-white/[0.02] text-9xl font-black translate-x-1/4 translate-y-1/4 group-hover:${theme.textLightOp10} transition-colors duration-700`}>
                                0{i + 1}
                            </div>

                            <div className={`${theme.text} mb-12 transform group-hover:-translate-y-2 transition-transform duration-500`}>
                                {stepIcons[i]}
                            </div>

                            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">{step.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-500 font-medium max-w-[200px]">
                                {step.desc}
                            </p>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}

function EducationSection({ certifications, settings }: { certifications: Certification[], settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();

    return (
        <section id="education" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <span className={`${theme.text} text-xs font-bold uppercase tracking-[0.3em] block mb-4`}>{t.education.sectionLabel}</span>
                        <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-12">
                            {t.education.title1} <br /><span className={theme.text}>{t.education.title2}</span>
                        </h2>

                        <div className="space-y-8">
                            <div className="p-10 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex items-start gap-8">
                                <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-black/5">
                                    <GraduationCap className={theme.text} size={32} />
                                </div>
                                <div className="space-y-2">
                                    <div className={`text-[10px] font-black ${theme.text} uppercase tracking-widest`}>{t.education.period}</div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{t.education.degree}</h3>
                                    <p className="text-zinc-500 text-sm">{t.education.degreeDesc}</p>
                                </div>
                            </div>

                            <div className={`p-10 ${theme.bg} rounded-[2.5rem] text-white flex items-start gap-8 shadow-2xl ${theme.shadow}`}>
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                                    <Award className="text-white" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black text-white/70 uppercase tracking-widest">{t.education.achievement}</div>
                                    <h3 className="text-2xl font-bold uppercase tracking-tight">{t.education.achievementTitle}</h3>
                                    <p className="text-white/80 text-sm opacity-80">{t.education.achievementDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 lg:pt-32">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8 text-center lg:text-left">{t.education.certifications}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {certifications.map((cert, i) => (
                                <RevealOnScroll
                                    key={i}
                                    delay={0.2 + i * 0.1}
                                    width="100%"
                                >
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between aspect-square md:aspect-auto h-full"
                                    >
                                        <Sparkles className={`${theme.text} mb-6`} size={20} />
                                        <div>
                                            <p className="text-zinc-900 dark:text-white font-bold leading-tight mb-1 uppercase text-sm">{cert.name}</p>
                                            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{cert.org}</p>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection({ testimonials, settings }: { testimonials: Testimonial[], settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();

    return (
        <section id="testimonials" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
                    <div className="md:max-w-xl">
                        <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.5em] block mb-6`}>{t.testimonials.sectionLabel}</span>
                        <h2 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.85]">
                            {t.testimonials.title1} <br /><span className={theme.text}>{t.testimonials.title2}</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <TiltCard key={i}>
                            <RevealOnScroll delay={i * 0.1} className="h-full">
                                <div className="h-full p-12 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                                    <div className="space-y-8">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Sparkles key={i} size={14} className={i < item.rating ? theme.text : "text-zinc-200 dark:text-zinc-800"} />
                                            ))}
                                        </div>
                                        <p className="text-xl font-medium text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                                            "{item.content}"
                                        </p>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-zinc-50 dark:border-zinc-800 flex items-center gap-4">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-full object-cover border border-zinc-100 dark:border-zinc-800"
                                            />
                                        ) : (
                                            <div className={`w-12 h-12 rounded-full ${theme.bgLight} dark:bg-white/10 flex items-center justify-center ${theme.text} font-black text-xs uppercase`}>
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white">{item.name}</h4>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.role} @ {item.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MugenHero({ settings, projectsCount }: { settings: HomeProps['settings'], projectsCount: number }) {
    const { t } = useTranslation();
    const firstName = settings?.full_name?.split(" ")[0]?.toUpperCase() || "MAULANA";
    const lastName = settings?.full_name?.split(" ").slice(1).join(" ")?.toUpperCase() || "IKHSAN";

    return (
        <section className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white flex flex-col overflow-hidden font-sans transition-colors duration-1000">
            {/* Background Dynamic Gradients for Depth */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-violet-500/5 dark:bg-violet-500/[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-1/4 w-[80vw] h-[80vw] bg-blue-500/5 dark:bg-blue-500/[0.03] blur-[120px] rounded-full" />
            </div>

            {/* Background Systems Watermark (Identity Aligned) */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.03] overflow-hidden select-none"
            >
                <h1 className="text-[60vw] font-black leading-none uppercase -tracking-[0.08em] translate-y-24 text-zinc-900 dark:text-white">
                    SYSTEMS
                </h1>
            </motion.div>

            {/* Centered Large Text */}
            <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-6 pt-20">
                <div className="relative text-center select-none perspective-1000">
                    <motion.h1
                        initial={{ opacity: 0, y: 150 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[20vw] md:text-[16vw] leading-[0.7] font-black tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {firstName}
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 150 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-[20vw] md:text-[16vw] leading-[0.7] font-black tracking-tighter uppercase whitespace-nowrap text-transparent transition-all duration-1000 hover:text-zinc-950 dark:hover:text-white"
                        style={{
                            WebkitTextStroke: '1.5px currentColor',
                            opacity: 0.15
                        }}
                    >
                        {lastName}
                    </motion.h1>
                </div>
            </div>

            {/* Bottom Section: Description & Signature Card */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-12 relative z-20 mt-auto bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pt-32">
                <div className="max-w-md">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-zinc-400 dark:text-zinc-500 text-lg md:text-2xl font-medium leading-tight tracking-tight mb-8"
                    >
                        {settings?.hero_description || t.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex gap-10 items-center"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700">Strategic Node</span>
                            <span className="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-white">Active© Node</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                            <ArrowDownRight size={20} className="text-zinc-400 dark:text-white opacity-40 animate-bounce" />
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row items-end gap-12">
                    {/* Simplified Bottom Actions (Moved metrics to header) */}
                    <div className="hidden md:flex flex-col gap-1 items-start mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700">Experience Node</span>
                        <span className="text-xs font-bold tracking-widest uppercase text-zinc-900 dark:text-white">Active Engagement</span>
                    </div>

                    {/* Smaller Signature Profile Card (Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group mb-4 md:mb-8"
                    >
                        <Magnetic>
                            <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-[3rem] overflow-hidden w-[80vw] md:w-64 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] group hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-500">
                                <div className="aspect-square relative overflow-hidden">
                                    {settings?.profile_photo && (
                                        <img
                                            src={settings.profile_photo}
                                            className="w-full h-full object-cover grayscale transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:grayscale-0"
                                            alt={settings.full_name}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-white">{settings?.full_name?.split(" ")[0]}</h3>
                                            <Fingerprint size={12} className="text-emerald-400 opacity-60 animate-pulse" />
                                        </div>
                                        <p className="text-[8px] uppercase font-black text-white/40 tracking-[0.3em]">{settings?.job_title}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-4 border-t border-zinc-100 dark:border-white/5">
                                    <a href="#contact" className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:scale-[1.02] transition-all">Connect</a>
                                    <a href="#projects" className="w-12 aspect-square flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-900 dark:text-white"><ArrowUpRight size={16} /></a>
                                </div>
                            </div>
                        </Magnetic>

                        {/* Availability Tag Floating */}
                        <div className="absolute -top-3 -right-3 bg-zinc-950 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl pointer-events-none border border-white/10 dark:border-black/10 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Operational S'25
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Subtle Noise/Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-20 mix-blend-overlay noise-bg" />
        </section>
    );
}


import ScrollStack, { ScrollStackItem } from '@/components/portfolio/scroll-stack/ScrollStack';

// Scroll-animated Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
    const { t } = useTranslation();
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image
    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    // Scale effect as card comes into view
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
    // Opacity fade
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className="w-full h-full"
        >
            <Link href={`/project/${project.slug}`} className="block group w-full h-full relative">
                <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/20 border border-zinc-100 dark:border-zinc-800 transition-all duration-500">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            style={{ y: imageY }}
                            className="w-[110%] h-[120%] object-cover -mt-[10%] transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />

                        {/* View Project Button Overlay */}
                        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">{t.projects.viewProject}</span>
                                <div className="w-8 h-8 rounded-full bg-white text-zinc-900 flex items-center justify-center">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="flex flex-wrap gap-3 mb-6"
                        >
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black text-white border border-white/10 uppercase tracking-widest hover:bg-white/20 transition-colors">{t}</span>
                            ))}
                        </motion.div>
                        <div className="overflow-hidden">
                            <motion.h3
                                initial={{ y: 100 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter leading-[0.85]"
                            >
                                {project.title}
                            </motion.h3>
                        </div>
                        <div className="flex justify-between items-end border-t border-white/20 pt-8 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                            <p className="text-white/80 font-medium max-w-md hidden md:block">{project.description}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function ProjectSection({ projects, settings }: { projects: Project[], settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();
    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Header outside/above the stack */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="md:max-w-xl"
                    >
                        <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.5em] block mb-6`}>{t.projects.sectionLabel}</span>
                        <h2 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.85]">
                            {t.projects.title1} <br /><span className={theme.text}>{t.projects.title2}</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="space-y-8"
                    >
                        <p className="text-zinc-500 font-medium text-lg max-w-sm">
                            {t.projects.description}
                        </p>
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-4">
                            {categories.map(cat => (
                                <motion.button
                                    key={cat}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? `${theme.bg} text-white shadow-xl ${theme.shadow}`
                                        : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                >
                                    {cat === 'All' ? (t.projects.filterAll || 'All') : cat}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Stack Implementation - Reduced Height */}
            <div className="w-full max-w-full overflow-hidden">
                <ScrollStack className="w-full" itemDistance={50} itemStackDistance={25} itemScale={0.05} blurAmount={4} useWindowScroll={true}>
                    {filteredProjects.map((project, i) => (
                        <ScrollStackItem key={project.id} itemClassName="w-full max-w-5xl mx-auto px-6 h-[60vh] flex items-center justify-center">
                            <ProjectCard project={project} index={i} />
                        </ScrollStackItem>
                    ))}
                </ScrollStack>
            </div>
        </section>
    );
}

export default function Home({ projects, experiences, skills, certifications, testimonials, settings }: HomeProps) {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden">
            <Head>
                <title>{`${settings?.full_name || 'Maulana Muhammad Ikhsan'} | ${settings?.job_title || 'AIS Strategist & Fullstack Developer'}`}</title>
                <meta name="description" content={`Portfolio of ${settings?.full_name || 'Maulana Muhammad Ikhsan'}, ${settings?.job_title || 'an Accounting Information Systems specialist'} focused on ERP optimization and financial systems.`} />
                <meta property="og:title" content={`${settings?.full_name || 'Maulana Muhammad Ikhsan'} | ${settings?.job_title || 'AIS Strategist'}`} />
                <meta property="og:description" content={settings?.hero_description || "Bridging the gap between accounting logic and modern technology."} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <header className="fixed top-0 inset-x-0 z-50 p-8 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <Magnetic>
                        <Link href="/" className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none mb-1">
                            {settings?.site_name?.toUpperCase() || 'IKHSAN'}
                        </Link>
                    </Magnetic>
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">My Portfolio // © '26</span>
                        <div className="hidden sm:block w-8 h-px bg-zinc-200 dark:bg-zinc-800" />
                        <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700">AIS Strategist</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 pointer-events-auto">
                    <LiveClock />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 }}
                        className="flex items-center gap-3 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl text-zinc-900 dark:text-white px-5 py-3 rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-white/10 transition-all hover:scale-105"
                    >
                        <Cpu size={14} className="text-violet-600 dark:text-violet-400" />
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-50 text-zinc-500">System Status</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Strategic Flow</span>
                        </div>

                        <div className="w-px h-6 bg-zinc-200 dark:bg-white/10 mx-1" />

                        <div className="hidden lg:flex flex-col">
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-50 text-zinc-500">Environmental</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">JKT • 28°C</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main className="overflow-x-hidden">
                <MugenHero settings={settings} projectsCount={projects.length} />
                <Marquee items={techNames} color={settings?.primary_color} />
                <ProjectSection projects={projects} settings={settings} />
                <BentoSection settings={settings} />
                <ExpertiseSection skills={skills} settings={settings} />
                <TimelineSection experiences={experiences} settings={settings} />
                <ProcessSection settings={settings} />
                <EducationSection certifications={certifications} settings={settings} />
                <TestimonialsSection testimonials={testimonials} settings={settings} />

                {/* Visual Separator */}
                <div className="py-12 px-6">
                    <div className="max-w-7xl mx-auto h-px bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <ContactSection settings={settings} />
            </main>

            <FloatingDock color={settings?.primary_color} cvUrl={settings?.cv_file} />

            <footer className="py-12 px-6 border-t border-zinc-100 dark:border-zinc-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-zinc-500 text-sm font-medium uppercase tracking-widest">© 2026 {settings?.full_name || 'Maulana Muhammad Ikhsan'} - {t.footer.portfolio}</div>
                    <div className="flex gap-8">
                        {[
                            { name: 'LinkedIn', url: settings?.linkedin_url || 'https://linkedin.com/' },
                            { name: 'GitHub', url: settings?.github_url || 'https://github.com/' },
                            { name: 'Instagram', url: settings?.instagram_url || 'https://instagram.com/' }
                        ].map(link => link.url && (
                            <Magnetic key={link.name}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest hover:text-violet-600 transition-colors block">
                                    {link.name}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

function ContactSection({ settings }: { settings: HomeProps['settings'] }) {
    const theme = getTheme(settings?.primary_color);
    const { t } = useTranslation();
    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="contact" className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <RevealOnScroll className="text-left">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
                            {t.contact.title1} <span className={theme.text}>{t.contact.title2}</span> <br /> {t.contact.title3}
                        </h2>
                        <p className="text-zinc-500 text-xl max-w-md mb-12">
                            {t.contact.description}
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: 'LinkedIn', href: 'https://linkedin.com/in/maulanamuhammadikhsan' },
                                { label: 'Canva Site', href: 'https://ikhsanportofolio.my.canva.site/business' },
                                { label: 'Instagram', href: 'https://instagram.com/' },
                            ].map((social) => (
                                <Magnetic key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:${theme.text} transition-colors block`}
                                    >
                                        {social.label} —&gt;
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} className="relative z-10 w-full">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10 dark:opacity-5">
                                <Mail size={120} />
                            </div>

                            {recentlySuccessful && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl text-center font-bold"
                                >
                                    {t.contact.formSuccess}
                                </motion.div>
                            )}

                            <form onSubmit={submit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.contact.formName}</label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:ring-2 ${theme.ring} outline-none transition-all`}
                                            placeholder="Ikhsan"
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.contact.formEmail}</label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`w-full bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:ring-2 ${theme.ring} outline-none transition-all`}
                                            placeholder="ikhsan@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] font-bold">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.contact.formSubject}</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className={`w-full bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:ring-2 ${theme.ring} outline-none transition-all`}
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.contact.formMessage}</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className={`w-full bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:ring-2 ${theme.ring} outline-none transition-all resize-none`}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && <p className="text-red-500 text-[10px] font-bold">{errors.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-8 text-lg font-black uppercase tracking-widest rounded-3xl bg-zinc-900 border-none dark:bg-white dark:text-black hover:${theme.bg} dark:hover:${theme.bg} dark:hover:text-white transition-all group overflow-hidden relative`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {t.contact.formSend}
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </Button>
                            </form>
                        </div>
                    </RevealOnScroll>
                </div>
            </div >
        </section >
    );
};
