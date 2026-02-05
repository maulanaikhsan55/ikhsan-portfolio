import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Zap } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

interface Certification {
    id: number;
    name: string;
    org: string;
    period: string;
    score: string;
}

export default function Form({ certification }: { certification?: Certification }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: certification?.name || '',
        org: certification?.org || '',
        period: certification?.period || '',
        score: certification?.score || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (certification) {
            put(`/admin/certifications/${certification.id}`);
        } else {
            post('/admin/certifications');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Certifications', href: '/admin/certifications' },
        { title: certification ? 'Edit Certification' : 'New Certification', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={certification ? `Refining ${certification.name}` : 'Documenting New Proof'} />

            <div className="p-8 max-w-4xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/certifications" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">
                                {certification ? 'Refine Proof' : 'New Proof'}
                            </h1>
                            <p className="text-zinc-500 font-medium">Verify your technical standing in the industry.</p>
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
                        {processing ? 'Hardening Proof...' : Object.keys(errors).length > 0 ? 'Fix Errors' : 'Save Proof'}
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
                            <p className="text-xs font-black uppercase tracking-widest">Verification Halted</p>
                            <p className="text-[10px] font-bold opacity-80 uppercase">{Object.keys(errors).length} data points require authentication before final commit.</p>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 gap-10">
                    <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Validation Proof</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Certification Identity</Label>
                                <Input
                                    className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4 text-lg font-bold"
                                    value={data.name} onChange={(e: any) => setData('name', e.target.value)}
                                    placeholder="e.g. Google Cloud Professional Architect"
                                />
                                {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.name}</p>}
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Issuing Authority</Label>
                                <Input
                                    className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                    value={data.org} onChange={(e: any) => setData('org', e.target.value)}
                                    placeholder="e.g. Google Cloud"
                                />
                                {errors.org && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.org}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl text-white">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Metrics & Timeline</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Validity Period</Label>
                                <Input
                                    className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white"
                                    value={data.period} onChange={(e: any) => setData('period', e.target.value)}
                                    placeholder="Dec 2023 - Dec 2025"
                                />
                                {errors.period && <p className="text-rose-400 text-[10px] font-bold uppercase">{errors.period}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mastery Score / Level</Label>
                                <Input
                                    className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white font-mono"
                                    value={data.score} onChange={(e: any) => setData('score', e.target.value)}
                                    placeholder="98 / 100"
                                />
                                {errors.score && <p className="text-rose-400 text-[10px] font-bold uppercase">{errors.score}</p>}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
