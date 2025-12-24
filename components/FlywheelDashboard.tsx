"use client";

import { motion } from "framer-motion";
import { Lock, RefreshCcw, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlywheelDashboard() {
    const [feesClaimed, setFeesClaimed] = useState(0.36);
    const [tokensBurned, setTokensBurned] = useState(81086627);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001';
                const res = await fetch(`${apiUrl}/api/stats`);
                const data = await res.json();
                setFeesClaimed(data.totalFeesClaimed);
                setTokensBurned(data.totalTokensBought);
                setIsLoaded(true);
            } catch (e) {
                console.warn('Bot API not reachable');
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm uppercase">
            <StatCard
                label="Total Treasury Inflow"
                value={`${feesClaimed.toFixed(2)} SOL`}
                icon={<DollarSign className="text-gold" />}
                borderColor="border-gold/30"
                delay={0}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative group p-6 rounded-xl border border-gold/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center text-center"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-50 animate-pulse" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <RefreshCcw size={40} className="text-gold mb-3 opacity-60" />
                </motion.div>
                <h3 className="text-[10px] text-zinc-500 tracking-widest mb-1 z-10">Vault Status</h3>
                <span className="text-xl font-bold text-gold z-10 tracking-widest">ACTIVE</span>
                <div className="flex items-center gap-2 mt-2 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-green-500 font-bold">ONLINE</span>
                </div>
            </motion.div>

            <StatCard
                label="Tokens Vaulted (Burned)"
                value={tokensBurned.toLocaleString()}
                icon={<Lock className="text-gold" />}
                borderColor="border-gold/30"
                delay={0.2}
            />
        </div>
    );
}

function StatCard({ label, value, icon, borderColor, delay }: { label: string, value: string, icon: React.ReactNode, borderColor: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`p-6 rounded-xl border ${borderColor} bg-slate-900/60 backdrop-blur-md flex flex-col justify-between items-start hover:bg-slate-900/80 transition-colors group`}
        >
            <div className="flex w-full justify-between items-start mb-4">
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest group-hover:text-gold/80 transition-colors">{label}</span>
                {icon}
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">
                {value}
            </span>
        </motion.div>
    )
}
