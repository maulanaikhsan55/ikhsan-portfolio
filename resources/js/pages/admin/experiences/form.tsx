// Update imports
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Briefcase, Calendar, FileText, Image as ImageIcon, Zap } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    company_logo?: string | File;
    desc: string;
    achievements: string[];
}

interface FormData {
    company: string;
    company_logo: string | File;
    role: string;
    period: string;
    desc: string;
    achievements: string;
    _method?: string;
}

export default function Form({ experience }: { experience?: Experience }) {
    const { data, setData, post, put, transform, processing, errors } = useForm<FormData>({
        company: experience?.company || '',
        company_logo: experience?.company_logo || '',
        role: experience?.role || '',
        period: experience?.period || '',
        desc: experience?.desc || '',
        achievements: experience?.achievements?.join('\n') || '',
        _method: experience ? 'put' : undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((d) => ({
            ...d,
            achievements: String(d.achievements).split('\n').map((a: string) => a.trim()).filter(Boolean),
        }));

        if (experience) {
            post(`/admin/experiences/${experience.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/experiences', {
                forceFormData: true,
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Experiences', href: '/admin/experiences' },
        { title: experience ? 'Refine Milestone' : 'New Milestone', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={experience ? `Refining ${experience.company}` : 'Documenting New Milestone'} />

            <div className="p-8 max-w-5xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/experiences" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">
                                {experience ? 'Refine History' : 'New Milestone'}
                            </h1>
                            <p className="text-zinc-500 font-medium">Capture the impact of your professional journey.</p>
                        </div>
                    </div>

                    <Button
                        disabled={processing}
                        onClick={handleSubmit}
                        className={`px-8 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-black/10 ${Object.keys(errors).length > 0
                            ? 'bg-rose-500 text-white hover:bg-rose-600'
                            : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105'
                            }`}
                    >
                        <Save size={18} className="mr-2" />
                        {processing ? 'Hardening History...' : Object.keys(errors).length > 0 ? 'Fix Errors' : 'Save Milestone'}
                    </Button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex items-center gap-4 text-rose-500"
                    >
                        <Zap size={24} className="animate-pulse" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest">Historical Integrity Compromised</p>
                            <p className="text-[10px] font-bold opacity-80 uppercase">{Object.keys(errors).length} fragments require validation before archival.</p>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Company & Role */}
                        <section className="md:col-span-12 lg:col-span-7 bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                            <div className="flex items-center gap-3 mb-10">
                                <Briefcase className="text-violet-600" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Organization Profile</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Company / Entity</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.company} onChange={(e: any) => setData('company', e.target.value)}
                                        placeholder="e.g. Google DeepMind"
                                    />
                                    {errors.company && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.company}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Official Role</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.role} onChange={(e: any) => setData('role', e.target.value)}
                                        placeholder="Lead Product Designer"
                                    />
                                    {errors.role && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.role}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Time Horizon</Label>
                                    <div className="relative">
                                        <Input
                                            className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4 pl-10"
                                            value={data.period} onChange={(e: any) => setData('period', e.target.value)}
                                            placeholder="Jan 2023 - Present"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                    </div>
                                    {errors.period && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.period}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Branding / Logo */}
                        <section className="md:col-span-12 lg:col-span-5 bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ImageIcon size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <Zap className="text-violet-400" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Entity Branding</h2>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative w-24 h-24 rounded-3xl overflow-hidden border border-white/5 bg-white/5 flex items-center justify-center">
                                        {data.company_logo ? (
                                            <img
                                                src={typeof data.company_logo === 'string' ? data.company_logo : URL.createObjectURL(data.company_logo as File)}
                                                className="w-full h-full object-cover"
                                                alt="Entity Visual"
                                            />
                                        ) : (
                                            <ImageIcon size={32} className="text-zinc-700" />
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2 text-center">Identity Visual (Logo)</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="bg-zinc-800 border-white/10 text-[10px] h-auto py-1"
                                            onChange={(e: any) => setData('company_logo', e.target.files ? e.target.files[0] : '')}
                                        />
                                    </div>
                                </div>
                                {errors.company_logo && <p className="text-rose-400 text-[10px] font-bold text-center">{errors.company_logo}</p>}
                            </div>
                        </section>
                    </div>

                    {/* Impact Narrative */}
                    <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                        <div className="flex items-center gap-3 mb-10">
                            <FileText className="text-violet-600" />
                            <h2 className="text-xl font-black uppercase tracking-tight">Impact Narrative</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mission Summary</Label>
                                <Textarea
                                    className="min-h-[120px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6"
                                    value={data.desc} onChange={(e: any) => setData('desc', e.target.value)}
                                    placeholder="Briefly describe your objectives and scope..."
                                />
                                {errors.desc && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.desc}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Core Achievements (One per line)</Label>
                                <Textarea
                                    className="min-h-[200px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 font-mono leading-relaxed"
                                    value={data.achievements} onChange={(e: any) => setData('achievements', e.target.value)}
                                    placeholder="Redesigned checkout flow resulting in 20% conversion boost&#10;Launched AI-driven recommendation engine&#10;Mentored a team of 5 junior developers"
                                />
                                {errors.achievements && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.achievements}</p>}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
