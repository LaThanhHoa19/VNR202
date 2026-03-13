import React from 'react';
import { motion } from 'framer-motion';

const StateItem = ({ label, value, icon, colorClass, glowClass }) => (
    <div className="flex flex-col gap-2 flex-1 group">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
            <span className="flex items-center gap-2">
                <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">{icon}</span> {label}
            </span>
            <span className={`${colorClass} font-mono text-xs`}>{value}%</span>
        </div>
        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                className={`h-full ${colorClass.replace('text', 'bg')} relative z-10`}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                className={`absolute inset-0 ${glowClass} blur-sm opacity-50`}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    </div>
);

const StatesBar = ({ states }) => {
    return (
        <div className="glass-card p-6 mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8 border-white/10">
            <StateItem 
                label="Quân sự" 
                value={states.militaryStrength || 50} 
                icon="⚔️" 
                colorClass="text-red-500" 
                glowClass="bg-red-500"
            />
            <StateItem 
                label="Lòng dân" 
                value={states.publicSupport || 50} 
                icon="🤝" 
                colorClass="text-blue-400" 
                glowClass="bg-blue-400"
            />
            <StateItem 
                label="Hậu cần" 
                value={states.logistics || 50} 
                icon="📦" 
                colorClass="text-amber-500" 
                glowClass="bg-amber-500"
            />
            <StateItem 
                label="Chính trị" 
                value={states.politicalLegitimacy || 50} 
                icon="⚖️" 
                colorClass="text-purple-400" 
                glowClass="bg-purple-400"
            />
        </div>
    );
};

export default StatesBar;
