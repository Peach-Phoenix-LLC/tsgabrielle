"use client";

import React from "react";

interface VideoSectionProps {
  heading?: string;
  videoUrl: string;
  posterImage?: string;
  autoplay?: boolean;
  aspectRatio?: string;
}

export default function VideoSection({
  heading,
  videoUrl,
  posterImage,
  autoplay = false,
  aspectRatio = "16/9",
}: VideoSectionProps) {
  const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
  const isVimeo = videoUrl?.includes("vimeo.com");

  const getEmbedUrl = () => {
    if (isYouTube) {
      const id = videoUrl.includes("youtu.be")
        ? videoUrl.split("/").pop()
        : new URL(videoUrl).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}${autoplay ? "?autoplay=1&mute=1" : ""}`;
    }
    if (isVimeo) {
      const id = videoUrl.split("/").pop();
      return `https://player.vimeo.com/video/${id}${autoplay ? "?autoplay=1&muted=1" : ""}`;
    }
    return videoUrl;
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {heading && (
          <h2 className="text-3xl font-bold mb-8 text-center font-[family-name:var(--font-space-grotesk)]">
            {heading}
          </h2>
        )}
        <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio }}>
          {isYouTube || isVimeo ? (
            <iframe
              src={getEmbedUrl()}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={heading || "Video"}
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              poster={posterImage}
              controls
              autoPlay={autoplay}
              muted={autoplay}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No video URL configured
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
