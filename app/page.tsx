"use client";

import { useState, useEffect } from 'react';
import {
    Twitter,
    FileText,
    Menu,
    X,
    CheckCircle,
    Copy,
    DollarSign,
    Coins,
    TrendingUp,
    Zap,
    Lock,
    RefreshCcw,
    Landmark,
    Users,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Stats State 
    const [stats, setStats] = useState({
        price: 0,
        marketCap: "0.00",
        change24h: 0,
        volume24h: 0,
        liquidity: "0.00",
        fees24h: 0,
        lockedPercent: 0,
        vaultBalance: "0.00"
    });

    const CA = "Coming Soon";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(CA);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToSection = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Automated Stats Fetching
    useEffect(() => {
        if (CA === "Coming Soon") return;

        const fetchLiveStats = async () => {
            try {
                const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`);
                const data = await response.json();

                if (data.pairs && data.pairs.length > 0) {
                    const pair = data.pairs[0];
                    setStats(prev => ({
                        ...prev,
                        price: parseFloat(pair.priceUsd),
                        marketCap: pair.fdv ? (pair.fdv > 1000000 ? `${(pair.fdv / 1000000).toFixed(2)}M` : `${(pair.fdv / 1000).toFixed(1)}K`) : "0.00",
                        change24h: pair.priceChange?.h24 || 0,
                        volume24h: pair.volume?.h24 || 0,
                        liquidity: pair.liquidity?.usd ? (pair.liquidity.usd > 1000 ? `${(pair.liquidity.usd / 1000).toFixed(1)}K` : pair.liquidity.usd.toString()) : "0.00",
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch live stats:", error);
            }
        };

        fetchLiveStats();
        const interval = setInterval(fetchLiveStats, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, [CA]);

    return (
        <main className="min-h-screen bg-cartoon-bg text-black font-comic selection:bg-cartoon-yellow/30">

            {/* Banner Background - Moved to top for correct stacking */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10" style={{ backgroundImage: "url('/doodle-pattern.png')", backgroundSize: "400px" }}>
            </div>



            {/* Header */}
            <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-4 border-cartoon-black shadow-lg">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/vault-3d.png" alt="Logo" className="w-12 h-12 hover:rotate-12 transition-transform mix-multiply" />
                        <h1 className="text-2xl text-cartoon-dark hidden md:block tracking-tight drop-shadow-sm font-cartoon">THE VAULT</h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        {['home', 'about', 'tokenomics', 'locked-supply', 'community'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="text-lg font-bold text-cartoon-black hover:text-cartoon-dark hover:-translate-y-1 transition-all uppercase tracking-tight"
                            >
                                {item.replace('-', ' ')}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a href="https://x.com/TreasuryCoinSol" target="_blank" className="bg-black text-white p-2 rounded-full hover:bg-cartoon-yellow hover:text-black border-2 border-black transition-all">
                            <Twitter size={20} />
                        </a>
                        <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="md:hidden bg-cartoon-yellow border-b-4 border-black overflow-hidden"
                        >
                            <nav className="flex flex-col p-4 gap-4 text-center">
                                {['home', 'about', 'tokenomics', 'locked-supply', 'community'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item)}
                                        className="text-xl font-black text-black hover:text-white uppercase py-2"
                                    >
                                        {item.replace('-', ' ')}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative pt-20 pb-20 px-4 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cartoon-yellow via-transparent to-transparent" />



                <h1 className="text-7xl md:text-[12rem] font-cartoon text-cartoon-yellow drop-shadow-[6px_6px_0px_#000] mb-4 z-10 stroke-black text-stroke-2 uppercase tracking-wider">
                    THE VAULT
                </h1>

                <div className="bg-white border-4 border-black px-6 py-2 rounded-full -rotate-2 mb-8 shadow-[6px_6px_0px_#000000] z-10">
                    <p className="text-xl md:text-3xl font-bold font-comic">"The floor price always climbs!"</p>
                </div>

                <div className="flex flex-col items-center gap-6 w-full max-w-md z-10">
                    <a
                        href={`https://jup.ag/swap?buy=${CA}`}
                        target="_blank"
                        className="w-full bg-cartoon-yellow text-black border-4 border-black font-black text-2xl py-4 rounded-xl shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#000000] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        BUY ON PUMP.FUN <Zap size={28} className="fill-black" />
                    </a>

                    <div className="w-full relative group">
                        <button
                            onClick={copyToClipboard}
                            className="w-full bg-white border-4 border-black text-black py-4 rounded-xl font-mono font-bold shadow-[6px_6px_0px_#999] hover:shadow-[8px_8px_0px_#999] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                            <span className="truncate">{CA}</span>
                        </button>
                    </div>
                </div>


            </section>

            {/* Live Price Section (Cartoon Card) */}
            <section id="live-price" className="py-20 px-4">
                <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-[3rem] p-8 shadow-[15px_15px_0px_#FFDE59] relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cartoon-yellow border-4 border-black px-8 py-2 rounded-full shadow-[4px_4px_0px_#000] flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <h2 className="text-2xl font-black uppercase">Live Stats</h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-100 border-4 border-black rounded-2xl p-6 flex items-center gap-4 shadow-[5px_5px_0px_#ccc]">
                            <div className="w-12 h-12 rounded-full bg-cartoon-yellow border-2 border-black flex items-center justify-center font-black text-2xl">$</div>
                            <div>
                                <p className="text-xs uppercase font-bold text-gray-500">Price (USD)</p>
                                <p className="text-3xl font-black">${stats.price.toFixed(6)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 border-4 border-black rounded-2xl p-6 flex items-center gap-4 shadow-[5px_5px_0px_#ccc]">
                            <div className="w-12 h-12 rounded-full bg-cartoon-yellow border-2 border-black flex items-center justify-center font-black text-2xl">#</div>
                            <div>
                                <p className="text-xs uppercase font-bold text-gray-500">Market Cap</p>
                                <p className="text-3xl font-black">US${stats.marketCap}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "24h Change", value: `${stats.change24h}%`, color: stats.change24h >= 0 ? "text-green-600" : "text-red-500" },
                            { label: "24h Volume", value: `$${stats.volume24h}`, color: "text-black" },
                            { label: "Liquidity", value: `$${stats.liquidity}`, color: "text-black" },
                            { label: "Fees 24h", value: `$${stats.fees24h}`, color: "text-black" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border-2 border-dashed border-black rounded-xl p-4 text-center">
                                <p className="text-xs font-black uppercase mb-1 text-gray-500">{stat.label}</p>
                                <p className={`font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="inline-block bg-cartoon-yellow border-4 border-black px-6 py-2 rotate-2 shadow-[5px_5px_0px_#000]">
                        <h2 className="text-4xl font-cartoon uppercase tracking-wider">About The Vault</h2>
                    </div>

                    <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_#000] text-lg font-medium space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cartoon-yellow rounded-bl-full opacity-20" />

                        <p className="text-2xl font-black text-cartoon-dark">
                            "The Floor Price Always Climbs!"
                        </p>
                        <p>
                            The Vault is built so the floor price always climbs, no matter what direction the price action moves.
                        </p>

                        <div className="bg-gray-50 border-2 border-black rounded-xl p-6">
                            <h3 className="text-2xl font-black mb-2 text-cartoon-dark">How It Works</h3>
                            <p>All Pump.fun creator fees are bought back and get burnt forever in <span className="font-black bg-yellow-200 px-1">The Vault</span>.</p>
                        </div>

                        <div className="prose prose-xl max-w-none bg-white p-8 rounded-[3rem] border-8 border-black shadow-[15px_15px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
                            <p className="mb-2">&gt; All Pump.fun Fees = Buyback & Burn</p>
                            <p className="mb-2">&gt; $100,000 buyback & permanent lock</p>
                            <p className="text-cartoon-yellow font-bold">&gt; The Vault Grows = Floor Price Increases 🚀</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tokenomics Section */}
            <section id="tokenomics" className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-6xl font-cartoon mb-16 inline-block text-stroke-1 stroke-black drop-shadow-[5px_5px_0px_#FFDE59] uppercase tracking-widest">Tokenomics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Lock className="w-10 h-10 text-black" />, title: "Creator Fees", desc: "All bought back & burnt forever" },
                            { icon: <TrendingUp className="w-10 h-10 text-black" />, title: "Rising Floor", desc: "Automatic price support" },
                            { icon: <RefreshCcw className="w-10 h-10 text-black" />, title: "Flywheel Effect", desc: "Volume drives value growth" },
                            { icon: <Landmark className="w-10 h-10 text-black" />, title: "Permanent Vault", desc: "Reducing supply = higher value" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border-4 border-black p-6 rounded-3xl hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_#000] group cursor-pointer hover:bg-cartoon-yellow">
                                <div className="bg-gray-100 border-2 border-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-2 uppercase">{item.title}</h3>
                                <p className="text-sm font-bold">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locked Supply Section (Cartoon Vault) */}
            <section id="locked-supply" className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-cartoon-yellow border-4 border-black p-8 md:p-12 rounded-[3rem] text-center shadow-[15px_15px_0px_#000] relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-cartoon mb-6 uppercase text-stroke-1 stroke-white drop-shadow-md tracking-wider">The Vault Security</h2>
                            <p className="text-xl font-bold mb-8">Forever locked, forever growing.</p>

                            <div className="bg-white border-4 border-black p-6 rounded-2xl inline-block mb-8 rotate-1">
                                <p className="text-xs font-black uppercase text-gray-400 mb-1">Current Locked Supply</p>
                                <p className="text-6xl font-black text-black tracking-tight">{stats.lockedPercent}%</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <a href="#" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-black border-2 border-black transition-all">
                                    View on Solscan
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="py-12 bg-black text-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-black text-cartoon-yellow mb-2">THE VAULT</h2>
                    <p className="font-mono text-xs mb-8">CA: {CA}</p>
                    <p className="text-xs text-gray-500">© 2025 The Vault. All rights reserved.</p>
                </div>
            </footer>

            {/* Whitepaper Modal */}
            <AnimatePresence>
                {isWhitepaperOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsWhitepaperOpen(false)}
                    >
                        {/* Same modal content but styled cartoonish */}
                        <motion.div
                            className="bg-white border-4 border-black rounded-3xl max-w-2xl w-full p-8 relative shadow-[10px_10px_0px_#FFDE59]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setIsWhitepaperOpen(false)} className="absolute top-4 right-4 bg-black text-white rounded-full p-1"><X size={20} /></button>
                            <h2 className="text-3xl font-black mb-4">Whitepaper</h2>
                            <div className="prose">
                                <p>It goes up. That's the whitepaper.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
