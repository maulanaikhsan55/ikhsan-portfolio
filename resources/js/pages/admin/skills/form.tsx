import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Zap } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

interface Skill {
    id: number;
    title: string;
    description: string;
    items: string[];
    icon: string;
}

export default function Form({ skill }: { skill?: Skill }) {
    const { data, setData, post, put, transform, processing, errors } = useForm({
        title: skill?.title || '',
        description: skill?.description || '',
        items: skill?.items?.join(', ') || '',
        icon: skill?.icon || 'Settings',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((d) => ({
            ...d,
            items: String(d.items).split(',').map((i: string) => i.trim()).filter(Boolean),
        }));

        if (skill) {
            put(`/admin/skills/${skill.id}`);
        } else {
            post('/admin/skills');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Skills', href: '/admin/skills' },
        { title: skill ? 'Edit Skill Category' : 'New Skill Category', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={skill ? `Refining ${skill.title}` : 'Defining New Mastery'} />

            <div className="p-8 max-w-4xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/skills" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">
                                {skill ? 'Refine Mastery' : 'New Mastery'}
                            </h1>
                            <p className="text-zinc-500 font-medium">Categorize your specialized technical expertise.</p>
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
                        {processing ? 'Hardening Logic...' : Object.keys(errors).length > 0 ? 'Fix Errors' : 'Save Mastery'}
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
                            <p className="text-xs font-black uppercase tracking-widest">Logic Flow Interrupted</p>
                            <p className="text-[10px] font-bold opacity-80 uppercase">{Object.keys(errors).length} nodes require validation before conceptual lock.</p>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 gap-10">
                    <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-violet-500/10 rounded-xl text-violet-600">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Core Concept</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Category Title</Label>
                                <Input
                                    className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                    value={data.title} onChange={(e: any) => setData('title', e.target.value)}
                                    placeholder="e.g. Frontend Architecture"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.title}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Visual Identifier (Icon)</Label>
                                <Select value={data.icon} onValueChange={(val) => setData('icon', val)}>
                                    <SelectTrigger className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl">
                                        <SelectValue placeholder="Select Icon" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="Settings">Settings / AI Strategy</SelectItem>
                                        <SelectItem value="Code2">Code2 / Development</SelectItem>
                                        <SelectItem value="PenTool">PenTool / Design</SelectItem>
                                        <SelectItem value="Database">Database / Systems</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Impact Description</Label>
                                <Textarea
                                    className="min-h-[120px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6"
                                    value={data.description} onChange={(e: any) => setData('description', e.target.value)}
                                    placeholder="Describe the value this skill set brings to the ecosystem..."
                                />
                                {errors.description && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.description}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl text-white">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Systems Mastery</h2>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Elements (Comma Separated)</Label>
                            <Input
                                className="h-14 bg-white/5 border-white/10 rounded-xl px-4 text-white font-mono"
                                value={data.items} onChange={(e: any) => setData('items', e.target.value)}
                                placeholder="React, Next.js, TypeScript, Framer Motion"
                            />
                            <p className="text-[9px] text-zinc-500 uppercase tracking-widest pt-2">These will appear as individual chips in your expertise section.</p>
                            {errors.items && <p className="text-rose-400 text-[10px] font-bold uppercase">{errors.items}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
