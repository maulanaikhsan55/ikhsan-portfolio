import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface AnalyticsChartsProps {
    projectViews: { title: string; views_count: number }[];
    messageTrends: { date: string; count: number }[];
}

export function AnalyticsCharts({ projectViews, messageTrends }: AnalyticsChartsProps) {
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = '#8b5cf6'; // Default violet-500, could be dynamic

    // Bar Chart Data (Project Views)
    const barData: ChartData<'bar'> = {
        labels: projectViews.map(p => p.title),
        datasets: [
            {
                label: 'Views',
                data: projectViews.map(p => p.views_count),
                backgroundColor: 'rgba(139, 92, 246, 0.5)', // Violet-500/50
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: isDark ? '#a1a1aa' : '#71717a',
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: isDark ? '#a1a1aa' : '#71717a',
                }
            }
        }
    };

    // Line Chart Data (Message Trends)
    const lineData: ChartData<'line'> = {
        labels: messageTrends.map(m => m.date),
        datasets: [
            {
                fill: true,
                label: 'Messages',
                data: messageTrends.map(m => m.count),
                borderColor: 'rgba(16, 185, 129, 1)', // Emerald-500
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                grid: { display: false },
                ticks: { display: false } // Hide dates to keep it clean if many
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium uppercase tracking-widest text-zinc-500">Top Projects by Views</CardTitle>
                </CardHeader>
                <CardContent>
                    <Bar data={barData} options={barOptions} />
                </CardContent>
            </Card>

            <Card className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-sm font-medium uppercase tracking-widest text-zinc-500">Message Trends (30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Line data={lineData} options={lineOptions} />
                </CardContent>
            </Card>
        </div>
    );
}
