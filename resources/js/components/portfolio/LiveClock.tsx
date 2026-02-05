import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LiveClock = ({ className = "" }: { className?: string }) => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Prevent hydration mismatch by returning null on server/first render
    if (!time) return null;

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZoneName: "short"
        });
    };

    // Split time into parts for individual animation if needed, 
    // but for now keeping it simple and premium
    const timeString = formatTime(time);
    const [clockTime, timeZone] = timeString.split(" ");

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-4 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 px-5 py-3 rounded-2xl shadow-2xl transition-all hover:bg-white/10 dark:hover:bg-white/5 group ${className}`}
        >
            <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Local Pulse</span>
                <div className="flex items-center gap-3">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="font-mono text-sm font-bold tracking-tighter text-zinc-900 dark:text-white">{clockTime}</span>
                </div>
            </div>

            <div className="w-px h-8 bg-zinc-200 dark:bg-white/10 mx-1" />

            <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Zone</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">{timeZone} • ID</span>
            </div>
        </motion.div>
    );
};
