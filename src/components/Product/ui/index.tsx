import React from 'react';

interface RowProps {
    label: string;
    value: React.ReactNode;
    isLast?: boolean;
}

export const Row: React.FC<RowProps> = ({ label, value, isLast }) => (
    <div className={`flex justify-between items-center py-5 ${!isLast ? 'border-b border-black/5' : ''}`}>
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#1a1a1a]/30 font-bold">{label}</span>
        <span className="text-[11px] text-[#1a1a1a] font-medium tracking-widest uppercase">{value}</span>
    </div>
);

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'purple' | 'silver' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'purple' }) => {
    const styles = {
        purple: 'bg-[#a932bd] text-white shadow-lg shadow-[#a932bd]/20',
        silver: 'bg-neutral-100 text-[#1a1a1a]',
        outline: 'border border-black/10 text-[#1a1a1a]/40'
    };

    return (
        <span className={`px-4 py-1.5 text-[8px] uppercase tracking-[0.3em] font-bold rounded-full ${styles[variant]}`}>
            {children}
        </span>
    );
};

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="bg-neutral-50/50 border border-black/5 rounded-[2rem] p-10 transition-all hover:bg-neutral-50 hover:shadow-sm">
        <h3 className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#1a1a1a]/20 mb-10">{title}</h3>
        {children}
    </div>
);

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="mb-16">
        <h2 className="text-5xl font-extralight tracking-tighter text-[#1a1a1a] mb-4">{title}</h2>
        {subtitle && <p className="text-[#1a1a1a]/40 font-serif italic text-xl">{subtitle}</p>}
    </div>
);
