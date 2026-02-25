import React from 'react';

interface RowProps {
    label: string;
    value: React.ReactNode;
    isLast?: boolean;
}

export const Row: React.FC<RowProps> = ({ label, value, isLast }) => (
    <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-white/5' : ''}`}>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-light">{label}</span>
        <span className="text-[11px] text-white/80 font-light tracking-wide">{value}</span>
    </div>
);

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'purple' | 'silver' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'purple' }) => {
    const styles = {
        purple: 'bg-[#a932bd] text-white',
        silver: 'bg-[#e7e7e7] text-black',
        outline: 'border border-white/20 text-white/60'
    };

    return (
        <span className={`px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold rounded-full ${styles[variant]}`}>
            {children}
        </span>
    );
};

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-8">{title}</h3>
        {children}
    </div>
);

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-light tracking-tight text-white mb-2">{title}</h2>
        {subtitle && <p className="text-white/40 font-serif italic">{subtitle}</p>}
    </div>
);
