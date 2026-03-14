"use client";

import React, { useState, useEffect } from "react";

interface AnnouncementSectionProps {
  messages: string[];
  backgroundColor?: string;
  textColor?: string;
  rotateInterval?: number;
}

export default function AnnouncementSection({
  messages = [],
  backgroundColor = "#0f1720",
  textColor = "#ffffff",
  rotateInterval = 4000,
}: AnnouncementSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, rotateInterval);
    return () => clearInterval(timer);
  }, [messages.length, rotateInterval]);

  if (messages.length === 0) return null;

  return (
    <div
      className="py-2 px-6 text-center overflow-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="relative h-5">
        {messages.map((msg, i) => (
          <span
            key={i}
            className={`absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
              i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
