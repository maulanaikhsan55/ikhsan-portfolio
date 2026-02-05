import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, MailOpen, Eye } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    is_read: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Messages', href: '/admin/messages' },
];

export default function Index({ messages }: { messages: Message[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(`/admin/messages/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inbox" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Inbox</h1>
                        <p className="text-zinc-500">Manage incoming inquiries.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 w-12 text-center">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Sender</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Subject</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {messages.map((msg) => (
                                <tr key={msg.id} className={`hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors ${!msg.is_read ? 'font-bold bg-violet-50/30' : ''}`}>
                                    <td className="px-8 py-6 text-center">
                                        {!msg.is_read ? <Mail className="text-violet-600 inline-block" size={18} /> : <MailOpen className="text-zinc-300 inline-block" size={18} />}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-zinc-900 dark:text-white">{msg.name}</div>
                                        <div className="text-xs text-zinc-500">{msg.email}</div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500">{msg.subject || '(No Subject)'}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/messages/${msg.id}`} className="p-2 text-zinc-400 hover:text-violet-600 transition-colors">
                                                <Eye size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(msg.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {messages.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-zinc-500 italic">No messages yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
