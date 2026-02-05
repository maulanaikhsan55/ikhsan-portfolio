import { Head, Link } from '@inertiajs/react';
import { motion, type Variants } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Instagram,
    Award,
    Briefcase,
    GraduationCap,
    Globe,
    ExternalLink,
    CheckCircle2,
    Settings,
    Code2,
    PenTool
} from 'lucide-react';
import { Magnetic, FloatingDock, ThemeToggle, TiltCard } from '@/components/portfolio/premium-ui';
import { useTranslation } from '@/hooks/useTranslation';

export default function Resume() {
    const { t } = useTranslation();

    const experiences = t.resume.experiences;
    const projects = t.resume.projects;
    const education = t.resume.education;
    const skills = t.resume.skills;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-violet-200">
            <Head title="Resume - Maulana Muhammad Ikhsan" />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-12">
                    <Magnetic>
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-violet-600 transition-colors group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black uppercase tracking-widest text-[10px]">{t.resume.backToWork}</span>
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <ThemeToggle />
                    </Magnetic>
                </div>

                <header className="p-12 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden shadow-2xl shadow-black/20">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <Award size={200} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                                Maulana <br /> Muhammad Ikhsan
                            </h1>
                            <p className="text-violet-400 font-bold uppercase tracking-[0.2em] text-xs">
                                {t.resume.roleSubtitle}
                            </p>
                        </div>
                        <Magnetic>
                            <button onClick={() => window.print()} className="flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all shadow-xl shadow-black/20">
                                <Download size={18} /> {t.resume.downloadCV}
                            </button>
                        </Magnetic>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10 relative z-10">
                        {[
                            { icon: Mail, label: 'maulanamuhammadikhsanxap2@gmail.com', href: 'mailto:maulanamuhammadikhsanxap2@gmail.com' },
                            { icon: Phone, label: '+62 857-0117-4347', href: '#' },
                            { icon: MapPin, label: 'Klaten, Java', href: '#' },
                            { icon: Github, label: 'github/ikhsan', href: 'https://github.com/maulanamuhammadikhsan' },
                            { icon: Linkedin, label: 'linkedin/ikhsan', href: 'https://linkedin.com/in/maulanamuhammadikhsan' },
                            { icon: Globe, label: 'ikhsanportofolio.my.canva.site', href: 'https://ikhsanportofolio.my.canva.site/business' }
                        ].map((contact, i) => (
                            <Magnetic key={i}>
                                <a href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                                    <contact.icon size={16} className="text-violet-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{contact.label}</span>
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-24">
                    <div className="lg:col-span-2 space-y-24">
                        {/* Experience */}
                        <section>
                            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                                <Briefcase size={16} /> {t.resume.sections.workExperience}
                            </h2>
                            <div className="space-y-12">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{exp.role}</h3>
                                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{exp.company}</p>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-violet-600 transition-colors">{exp.period}</span>
                                        </div>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">{exp.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                                <ExternalLink size={16} /> {t.resume.sections.featuredProjects}
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {projects.map((project, i) => (
                                    <TiltCard key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">{project.name}</h3>
                                            <span className="text-[10px] font-black px-3 py-1 bg-violet-600 text-white rounded-full uppercase tracking-widest">{project.period}</span>
                                        </div>
                                        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-4 italic text-violet-600">{project.role}</p>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                                    </TiltCard>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                                <GraduationCap size={16} /> {t.resume.sections.education}
                            </h2>
                            <div className="space-y-12">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{edu.school}</h3>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{edu.period}</span>
                                        </div>
                                        <p className="text-violet-600 font-bold uppercase tracking-widest text-[10px] mb-4">{edu.degree}</p>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">{edu.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-16">
                        {/* Skills */}
                        <section>
                            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-12">{t.resume.sections.technicalSkills}</h2>
                            <div className="space-y-10">
                                {skills.map((cat, i) => (
                                    <div key={i}>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">{cat.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.items.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg text-[10px] font-bold border border-zinc-200 dark:border-zinc-700 uppercase tracking-widest">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications */}
                        <section>
                            <h2 className="text-xs font-black text-violet-600 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                                <Award size={16} /> {t.resume.sections.certifications}
                            </h2>
                            <div className="space-y-6">
                                {t.resume.certificationsList.map((cert, i) => (
                                    <TiltCard key={i}>
                                        <div className={`p-6 rounded-2xl shadow-xl ${i === 0 ? 'bg-violet-600 text-white shadow-violet-500/20' :
                                            i === 1 ? 'bg-zinc-900 text-white shadow-black/20' :
                                                'bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-700 shadow-black/5'
                                            }`}>
                                            <h3 className="text-sm font-black uppercase tracking-tight mb-2">{cert.name}</h3>
                                            <p className="text-[10px] opacity-80 leading-relaxed uppercase tracking-widest">{cert.meta}</p>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="mt-12 text-center text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-32">
                    {t.resume.footer}
                </footer>
            </div>

            <FloatingDock />
        </div>
    );
}
