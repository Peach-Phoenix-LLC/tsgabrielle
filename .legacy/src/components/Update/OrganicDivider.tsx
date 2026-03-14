'use client';

import React from 'react';

const OrganicDivider = () => {
    return (
        <div className="w-full bg-white overflow-hidden leading-[0]">
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[120px]"
                style={{ fill: '#e7e7e7' }}
            >
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34,38.95-12.93,78.34-22.45,119.35-22.15,22.92.17,45.42,3.09,67.2,10.13,38.21,12.35,74.83,29.9,116.5,35,46.17,5.65,97-1.35,140.6-21L1200,46.29V0Z" />
            </svg>
        </div>
    );
};

export default OrganicDivider;
