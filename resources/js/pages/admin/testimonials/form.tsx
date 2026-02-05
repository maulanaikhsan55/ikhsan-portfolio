import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Zap } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    image: string | File | null;
}

export default function Form({ testimonial }: { testimonial?: Testimonial }) {
    const { data, setData, post, transform, processing, errors } = useForm({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        company: testimonial?.company || '',
        content: testimonial?.content || '',
        image: testimonial?.image || '',
        _method: testimonial ? 'put' : undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (testimonial) {
            post(`/admin/testimonials/${testimonial.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/testimonials', {
                forceFormData: true,
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Testimonials', href: '/admin/testimonials' },
        { title: testimonial ? 'Edit Testimonial' : 'New Testimonial', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={testimonial ? `Refining ${testimonial.name}` : 'Capturing New Voice'} />

            <div className="p-8 max-w-4xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/testimonials" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">
                                {testimonial ? 'Refine Voice' : 'New Voice'}
                            </h1>
                            <p className="text-zinc-500 font-medium">Curate the impact of your collaborative success stories.</p>
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
                        {processing ? 'Hardening Trust...' : Object.keys(errors).length > 0 ? 'Fix Errors' : 'Save Voice'}
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
                            <p className="text-xs font-black uppercase tracking-widest">Endorsement Authenticity Compromised</p>
                            <p className="text-[10px] font-bold opacity-80 uppercase">{Object.keys(errors).length} validation nodes require resolution before locking trust.</p>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <section className="lg:col-span-12 bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">Identity Profile</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-col items-center gap-6 p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
                                    {data.image ? (
                                        <img
                                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                            <Save size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Portrait Visual</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-[10px] h-auto py-1"
                                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : '')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.name} onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.name}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Professional Role</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.role} onChange={(e) => setData('role', e.target.value)}
                                        placeholder="Product Strategy lead"
                                    />
                                    {errors.role && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.role}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Company / Entity</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.company} onChange={(e) => setData('company', e.target.value)}
                                        placeholder="Creative Flow Inc."
                                    />
                                    {errors.company && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.company}</p>}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="lg:col-span-12 bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl text-white">
                                <Save size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">The Message</h2>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Endorsement Content</Label>
                            <Textarea
                                className="min-h-[200px] bg-white/5 border-white/10 rounded-2xl p-8 text-xl font-medium italic leading-relaxed text-white/90"
                                value={data.content} onChange={(e) => setData('content', e.target.value)}
                                placeholder="His ability to bridge the gap between technical logic and visual elegance is unmatched..."
                            />
                            {errors.content && <p className="text-rose-400 text-[10px] font-bold uppercase">{errors.content}</p>}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
