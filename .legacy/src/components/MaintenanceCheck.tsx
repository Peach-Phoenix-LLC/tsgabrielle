"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function MaintenanceCheck({ children }: { children: React.ReactNode }) {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Skip check for admin routes
        if (pathname?.startsWith('/admin') || pathname?.startsWith('/api/auth') || pathname?.startsWith('/api/settings')) {
            return;
        }

        fetch('/api/settings')
            .then(r => r.json())
            .then(data => {
                if (data.enabled) {
                    setIsMaintenance(true);
                }
            })
            .catch(() => { });
    }, [pathname]);

    if (isMaintenance) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3eeff',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                padding: '20px'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛠️</div>
                <h1 style={{ color: '#1a1a2e', marginBottom: '10px' }}>Site Maintenance</h1>
                <p style={{ color: '#6b6b8a', maxWidth: '400px' }}>
                    We are currently performing scheduled maintenance to bring you a better holographic experience. Please check back soon!
                </p>
                <div style={{ marginTop: '30px', fontSize: '12px', color: '#a78bfa' }}>
                    tsgabrielle<sup>®</sup> Security & Automation
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
