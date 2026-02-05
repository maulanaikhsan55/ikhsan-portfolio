import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Mail } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function Show({ message }: { message: Message }) {
    const { delete: destroy } = useForm();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messages', href: '/admin/messages' },
        { title: 'View Message', href: '#' },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(`/admin/messages/${message.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message from ${message.name}`} />

            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/messages" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">View Inquiry</h1>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-10 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8">
                        <Mail className="text-violet-500/20" size={100} />
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Sender</label>
                                <div className="text-xl font-bold">{message.name}</div>
                                <div className="text-zinc-500">{message.email}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Received At</label>
                                <div className="text-xl font-bold">{new Date(message.created_at).toLocaleString()}</div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Subject</label>
                            <div className="text-2xl font-black tracking-tight">{message.subject || '(No Subject)'}</div>
                        </div>

                        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-6">Message Content</label>
                            <div className="text-lg text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed min-h-[200px]">
                                {message.message}
                            </div>
                        </div>

                        <div className="flex justify-end pt-8">
                            <Button onClick={handleDelete} variant="destructive" className="rounded-xl flex gap-2">
                                <Trash2 size={18} />
                                Delete Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
