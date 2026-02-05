import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Palette, Globe, User, Share2, Image as ImageIcon, FileText } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface SettingsProps {
    settings: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'General Settings', href: '/admin/settings' },
];

export default function SettingsIndex({ settings }: SettingsProps) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        settings: {
            // General
            site_name: settings.site_name || 'My Portfolio',

            // Personal
            full_name: settings.full_name || 'Maulana Muhammad Ikhsan',
            job_title: settings.job_title || 'AIS Strategist & Fullstack Developer',
            hero_description: settings.hero_description || 'Mereduksi margin kesalahan kalkulasi hingga 57% melalui integrasi algoritma SQL & solusi ERP modern.',
            about_text: settings.about_text || 'Sebagai mahasiswa Sistem Informasi Akuntansi...',

            // Socials
            linkedin_url: settings.linkedin_url || '',
            github_url: settings.github_url || '',
            instagram_url: settings.instagram_url || '',

            // Theme
            primary_color: settings.primary_color || 'violet', // violet, blue, emerald, rose, amber
            available_for_work: settings.available_for_work || 'true',
        },
        profile_photo: null as File | string | null,
        cv_file: null as File | string | null,

        // Account Security
        email: auth.user.name, // The user object seems to use 'name' as identifier in some cases or we need email. Let's check SharedData.
        new_password: '',
        confirm_password: '',
    });

    // Actually, in many Laravel/Inertia setups, the email is on auth.user.email
    useEffect(() => {
        if (auth.user.email) {
            // @ts-ignore
            setData('email', auth.user.email);
        }
    }, [auth.user]);

    // Initialize photo/cv from settings if they exist
    useState(() => {
        if (settings.profile_photo) setData('profile_photo', settings.profile_photo);
        if (settings.cv_file) setData('cv_file', settings.cv_file);
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const colors = [
        { name: 'violet', class: 'bg-violet-600' },
        { name: 'blue', class: 'bg-blue-600' },
        { name: 'emerald', class: 'bg-emerald-600' },
        { name: 'rose', class: 'bg-rose-600' },
        { name: 'amber', class: 'bg-amber-600' },
        { name: 'cyan', class: 'bg-cyan-600' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="General Settings" />

            <div className="p-8 max-w-5xl mx-auto pb-44">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Portfolio Engine</h1>
                        <p className="text-zinc-500 font-medium">Configure your digital identity and system security.</p>
                    </div>
                    <Button
                        disabled={processing}
                        onClick={submit}
                        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-102 transition-all shadow-xl shadow-black/10"
                    >
                        {processing ? 'Saving...' : (
                            <div className="flex items-center gap-2">
                                <Save size={18} />
                                <span>Save Changes</span>
                            </div>
                        )}
                    </Button>
                </div>

                {recentlySuccessful && (
                    <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-sm font-bold flex items-center gap-3">
                        <CheckCircle2 size={18} />
                        Settings updated successfully!
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Visuals & Personal */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Personal Information */}
                        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-10">
                                <User className="text-violet-600" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Identity Profile</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</Label>
                                    <Input
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl h-12"
                                        value={data.settings.full_name}
                                        onChange={e => setData('settings', { ...data.settings, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Job Title</Label>
                                    <Input
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl h-12"
                                        value={data.settings.job_title}
                                        onChange={e => setData('settings', { ...data.settings, job_title: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hero Intro (Punchline)</Label>
                                    <Textarea
                                        className="min-h-[100px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl p-4"
                                        value={data.settings.hero_description}
                                        onChange={e => setData('settings', { ...data.settings, hero_description: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">About Narrative</Label>
                                    <Textarea
                                        className="min-h-[180px] bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl p-4 leading-relaxed"
                                        value={data.settings.about_text}
                                        onChange={e => setData('settings', { ...data.settings, about_text: e.target.value })}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Social Connections */}
                        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-10">
                                <Share2 className="text-violet-600" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Social Networks</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-black">LinkedIn</Label>
                                    <Input
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl"
                                        value={data.settings.linkedin_url}
                                        onChange={e => setData('settings', { ...data.settings, linkedin_url: e.target.value })}
                                        placeholder="URL"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-black">GitHub</Label>
                                    <Input
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl"
                                        value={data.settings.github_url}
                                        onChange={e => setData('settings', { ...data.settings, github_url: e.target.value })}
                                        placeholder="URL"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-black">Instagram</Label>
                                    <Input
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 rounded-xl"
                                        value={data.settings.instagram_url}
                                        onChange={e => setData('settings', { ...data.settings, instagram_url: e.target.value })}
                                        placeholder="URL"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Assets & Security */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Visual & Color */}
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Palette className="text-violet-600" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Theme Engine</h2>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => setData('settings', { ...data.settings, primary_color: color.name })}
                                        className={`h-12 rounded-xl ${color.class} transition-all relative overflow-hidden group ${data.settings.primary_color === color.name
                                            ? 'ring-2 ring-violet-500 scale-105'
                                            : 'opacity-40 hover:opacity-80'
                                            }`}
                                    >
                                        {data.settings.primary_color === color.name && (
                                            <Check className="mx-auto text-white" size={16} />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Profile Image</Label>
                                    <div className="flex flex-col gap-4">
                                        {(data.profile_photo) && (
                                            <div className="w-full aspect-square rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 shadow-inner">
                                                <img
                                                    src={typeof data.profile_photo === 'string' ? data.profile_photo : URL.createObjectURL(data.profile_photo)}
                                                    className="w-full h-full object-cover"
                                                    alt="Profile"
                                                />
                                            </div>
                                        )}
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e: any) => setData('profile_photo', e.target.files[0])}
                                            className="text-[10px] h-auto py-2"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Professional CV (PDF)</Label>
                                    <Input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e: any) => setData('cv_file', e.target.files[0])}
                                        className="text-[10px] h-auto py-2"
                                    />
                                    {settings.cv_file && (
                                        <a href={settings.cv_file} target="_blank" className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-[10px] font-black uppercase text-violet-600 hover:bg-violet-50 transition-colors">
                                            <FileText size={14} /> Open Global CV
                                        </a>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Account Security Integration */}
                        <section className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShieldCheck size={100} />
                            </div>

                            <div className="flex items-center gap-3 mb-8">
                                <Lock className="text-violet-400" />
                                <h2 className="text-lg font-black uppercase tracking-tight">Account Safety</h2>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Login Email</Label>
                                    <Input
                                        className="bg-zinc-800 border-zinc-700 rounded-xl"
                                        value={data.email}
                                        // @ts-ignore
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-[10px] text-rose-400 font-bold">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Reset Password</Label>
                                    <Input
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="bg-zinc-800 border-zinc-700 rounded-xl"
                                        value={data.new_password}
                                        // @ts-ignore
                                        onChange={e => setData('new_password', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Confirm Reset</Label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-zinc-800 border-zinc-700 rounded-xl"
                                        value={data.confirm_password}
                                        // @ts-ignore
                                        onChange={e => setData('confirm_password', e.target.value)}
                                    />
                                    {errors.new_password && <p className="text-[10px] text-rose-400 font-bold">{errors.new_password}</p>}
                                </div>
                                <p className="text-[9px] text-zinc-500 font-medium leading-tight">Leave password fields empty if you don't wish to change it.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Add these imports to the top of the file
import { CheckCircle2, Check, Lock, ShieldCheck } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
