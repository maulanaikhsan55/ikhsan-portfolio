import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Sparkles, FileText, Image as ImageIcon, Zap, Target, Layout } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    long_description: string;
    image: string | File | null;
    category: string;
    tech: string[];
    year: string;
    duration: string;
    client: string;
    role: string;
    live_url?: string;
    github_url?: string;
    features: string[];
    screenshots: (string | File)[];
    challenges: string;
    solution: string;
    featured: boolean;
    impact?: string;
    tools?: string[];
    awards?: string;
    status: 'published' | 'draft';
}

interface FormData {
    title: string;
    slug: string;
    description: string;
    long_description: string;
    image: string | File | null;
    category: string;
    tech: string;
    year: string;
    duration: string;
    client: string;
    role: string;
    live_url: string;
    github_url: string;
    features: string;
    screenshots: (string | File)[];
    challenges: string;
    solution: string;
    featured: boolean;
    impact: string;
    tools: string;
    awards: string;
    status: 'published' | 'draft';
    _method?: string;
}

export default function Form({ project }: { project?: Project }) {
    const { data, setData, post, put, transform, processing, errors } = useForm<FormData>({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        long_description: project?.long_description || '',
        image: project?.image || '',
        category: project?.category || '',
        tech: project?.tech?.join(', ') || '',
        year: project?.year || '',
        duration: project?.duration || '',
        client: project?.client || '',
        role: project?.role || '',
        live_url: project?.live_url || '',
        github_url: project?.github_url || '',
        features: project?.features?.join('\n') || '',
        screenshots: (project?.screenshots || []) as (string | File)[],
        challenges: project?.challenges || '',
        solution: project?.solution || '',
        featured: project ? Boolean(project.featured) : false,
        impact: project?.impact || '',
        tools: project?.tools?.join(', ') || '',
        awards: project?.awards || '',
        status: (project?.status as 'published' | 'draft') || 'published',
        _method: project ? 'put' : undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((d) => ({
            ...d,
            tech: String(d.tech).split(',').map((t: string) => t.trim()).filter(Boolean),
            features: String(d.features).split('\n').map((f: string) => f.trim()).filter(Boolean),
            tools: String(d.tools).split(',').map((t: string) => t.trim()).filter(Boolean),
        }));

        if (project) {
            post(`/admin/projects/${project.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    // Success handling if needed
                },
                onError: (err) => {
                    console.error('Update Failed:', err);
                }
            });
        } else {
            post('/admin/projects', {
                forceFormData: true,
                onSuccess: () => {
                    // Success handling
                },
                onError: (err) => {
                    console.error('Creation Failed:', err);
                }
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
        { title: project ? 'Edit Work' : 'New Genesis', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project ? `Refining ${project.title}` : 'Launching New Work'} />

            <div className="p-8 max-w-6xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/projects" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:scale-110 transition-transform shadow-sm">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">
                                {project ? 'Refine Work' : 'New Genesis'}
                            </h1>
                            <p className="text-zinc-500 font-medium">Define the DNA of your innovative creation.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <select
                            value={data.status}
                            onChange={(e: any) => setData('status', e.target.value)}
                            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-2 text-xs font-black uppercase tracking-widest outline-none shadow-sm"
                        >
                            <option value="published">Status: Live</option>
                            <option value="draft">Status: Stealth</option>
                        </select>
                        <Button
                            disabled={processing}
                            onClick={handleSubmit}
                            className={`px-8 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-black/10 ${Object.keys(errors).length > 0
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105'
                                }`}
                        >
                            <Save size={18} className="mr-2" />
                            {processing ? 'Processing...' : Object.keys(errors).length > 0 ? 'Fix Errors' : 'Save DNA'}
                        </Button>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex items-center gap-4 text-rose-500"
                    >
                        <Zap size={24} className="animate-pulse" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest">Architectural Integrity Compromised</p>
                            <p className="text-[10px] font-bold opacity-80 uppercase">{Object.keys(errors).length} validation points require attention before deployment.</p>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Identity & Narrative */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Core Identity */}
                        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                            <div className="flex items-center gap-3 mb-10">
                                <Sparkles className="text-violet-600" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Core Identity</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Project Name</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.title} onChange={(e: any) => setData('title', e.target.value)}
                                        placeholder="e.g. AgriDuck AI"
                                    />
                                    {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.title}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Slug Identifier</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4 font-mono"
                                        value={data.slug} onChange={(e: any) => setData('slug', e.target.value)}
                                        placeholder="agriduck-ai"
                                    />
                                    {errors.slug && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.slug}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Brief Impact Summary (1-2 sentences)</Label>
                                    <Textarea
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl p-4"
                                        value={data.description} onChange={(e: any) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.description}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Main Tech Stack (Comma separated)</Label>
                                    <Input
                                        className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl px-4"
                                        value={data.tech} onChange={(e: any) => setData('tech', e.target.value)}
                                        placeholder="React, Laravel, OpenAI, Tailwind"
                                    />
                                    {errors.tech && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.tech}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Detailed Narrative */}
                        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all group">
                            <div className="flex items-center gap-3 mb-10">
                                <FileText className="text-violet-600" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Case Study Narrative</h2>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Project Lifecycle Documentation</Label>
                                    <Textarea
                                        className="min-h-[300px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 leading-relaxed"
                                        value={data.long_description} onChange={(e: any) => setData('long_description', e.target.value)}
                                        placeholder="Tell the story of the project from conception to launch..."
                                    />
                                    {errors.long_description && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.long_description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">The Friction (Challenge)</Label>
                                        <Textarea
                                            className="min-h-[150px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6"
                                            value={data.challenges} onChange={(e: any) => setData('challenges', e.target.value)}
                                        />
                                        {errors.challenges && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.challenges}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">The Solution Architecture</Label>
                                        <Textarea
                                            className="min-h-[150px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6"
                                            value={data.solution} onChange={(e: any) => setData('solution', e.target.value)}
                                        />
                                        {errors.solution && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.solution}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Key Features (One per line)</Label>
                                    <Textarea
                                        className="h-40 bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 font-mono"
                                        value={data.features} onChange={(e: any) => setData('features', e.target.value)}
                                        placeholder="Automated Workflow&#10;Neural Network Integration&#10;Real-time Analytics"
                                    />
                                    {errors.features && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.features}</p>}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Media & Details */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Visual Assets */}
                        <section className="bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ImageIcon size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <Zap className="text-violet-400" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Visual Engine</h2>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Master Hero Image</Label>
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-white/5 group">
                                        {data.image ? (
                                            <img
                                                src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                alt="Master Visual"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                                                <ImageIcon size={40} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">No Visual Set</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="bg-zinc-800/80 border-white/10 text-[10px] h-auto py-1"
                                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : '')}
                                            />
                                        </div>
                                    </div>
                                    {errors.image && <p className="text-rose-400 text-[10px] font-bold">{errors.image}</p>}
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Project Gallery</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {data.screenshots.slice(0, 4).map((s, i) => (
                                            <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/5">
                                                <img src={typeof s === 'string' ? s : URL.createObjectURL(s)} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        type="file"
                                        multiple
                                        className="bg-zinc-800/80 border-white/10 text-[10px] h-auto py-1"
                                        onChange={(e) => setData('screenshots', e.target.files ? Array.from(e.target.files) : [])}
                                    />
                                    {errors.screenshots && <p className="text-rose-400 text-[10px] font-bold">{errors.screenshots}</p>}
                                    <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">Bulk upload for gallery (Replaces current)</p>
                                </div>
                            </div>
                        </section>

                        {/* Metadata Details */}
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Target className="text-violet-600" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Project Vitals</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={data.featured}
                                            onChange={e => setData('featured', e.target.checked)}
                                            className="w-4 h-4 rounded-lg bg-zinc-100 border-zinc-200 text-violet-600 focus:ring-violet-500"
                                        />
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Featured Headline</Label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Category</Label>
                                        <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.category} onChange={e => setData('category', e.target.value)} />
                                        {errors.category && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.category}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Genesis Year</Label>
                                        <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.year} onChange={e => setData('year', e.target.value)} />
                                        {errors.year && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.year}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Duration</Label>
                                        <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.duration} onChange={e => setData('duration', e.target.value)} />
                                        {errors.duration && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.duration}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Client / Authority</Label>
                                        <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.client} onChange={e => setData('client', e.target.value)} />
                                        {errors.client && <p className="text-rose-500 text-[10px] font-bold uppercase">{errors.client}</p>}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Connectivity */}
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Layout className="text-violet-600" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Active Nodes</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-black">Live Deployment URL</Label>
                                    <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.live_url} onChange={e => setData('live_url', e.target.value)} placeholder="https://..." />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-black">Source Nexus (GitHub)</Label>
                                    <Input className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl" value={data.github_url} onChange={e => setData('github_url', e.target.value)} placeholder="https://github.com/..." />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
