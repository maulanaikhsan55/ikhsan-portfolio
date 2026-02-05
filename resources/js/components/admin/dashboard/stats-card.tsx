import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    className?: string;
}

export function StatsCard({ title, value, description, icon, className }: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden border-zinc-200 dark:border-zinc-800", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                    {title}
                </CardTitle>
                <div className="h-8 w-8 text-zinc-500">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                {description && (
                    <p className="text-xs text-zinc-500 mt-2">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
