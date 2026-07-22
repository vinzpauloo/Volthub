"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiPlayCircleLine,
  RiTimeLine,
  RiCloseLine,
  RiPauseCircleLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiFullscreenLine,
  RiSkipBackLine,
  RiSkipForwardLine,
} from "react-icons/ri";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface VideoEntry {
  id: string;
  title: string;
  description: string;
  duration: string;
  src: string;
  poster?: string;
}

/* ──────────────────────────────────────────────
   Video Data
   ────────────────────────────────────────────── */

const VIDEOS: VideoEntry[] = [
  {
    id: "1",
    title: "VoltHub EV Charging Solutions",
    description:
      "Discover how VoltHub is powering the future of electric mobility in the Philippines with reliable, fast, and accessible EV charging stations nationwide.",
    duration: "2:15",
    src: "/Product/CBMB.mp4",
  },
];

/* ──────────────────────────────────────────────
   Format time helper
   ────────────────────────────────────────────── */

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ──────────────────────────────────────────────
   Video Modal with custom HTML5 player
   ────────────────────────────────────────────── */

function VideoModal({
  video,
  onClose,
}: {
  video: VideoEntry;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide controls after inactivity
  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * duration;
  };

  const skip = (sec: number) => {
    if (videoRef.current) videoRef.current.currentTime += sec;
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors z-20"
        aria-label="Close video"
      >
        <RiCloseLine size={32} />
      </button>

      {/* Video container */}
      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl group"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetHideTimer}
        onMouseLeave={() => playing && setShowControls(false)}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          className="w-full max-h-[85vh] cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          playsInline
          preload="metadata"
        />

        {/* Big play button when paused */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
            aria-label="Play"
          >
            <span className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white/95 shadow-2xl hover:scale-105 transition-transform">
              <RiPlayCircleLine className="text-primary" size={52} />
            </span>
          </button>
        )}

        {/* Bottom control bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-3 px-4 md:px-6 transition-opacity duration-300 ${
            showControls || !playing ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress bar */}
          <div
            className="h-1 bg-white/25 rounded-full cursor-pointer mb-3 group/progress hover:h-1.5 transition-all"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary rounded-full relative"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Skip back */}
              <button
                type="button"
                onClick={() => skip(-10)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Skip back 10 seconds"
              >
                <RiSkipBackLine size={20} />
              </button>

              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors p-1"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <RiPauseCircleLine size={28} />
                ) : (
                  <RiPlayCircleLine size={28} />
                )}
              </button>

              {/* Skip forward */}
              <button
                type="button"
                onClick={() => skip(10)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Skip forward 10 seconds"
              >
                <RiSkipForwardLine size={20} />
              </button>

              {/* Volume */}
              <button
                type="button"
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors p-1 ml-1"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <RiVolumeMuteLine size={20} />
                ) : (
                  <RiVolumeUpLine size={20} />
                )}
              </button>

              {/* Time display */}
              <span className="text-white/70 text-xs ml-2 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Fullscreen"
            >
              <RiFullscreenLine size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Video title below */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-center hidden md:block"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold">{video.title}</h3>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Video Card
   ────────────────────────────────────────────── */

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoEntry;
  onPlay: (v: VideoEntry) => void;
}) {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
      {/* Thumbnail + play overlay */}
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="relative w-full aspect-video overflow-hidden bg-gray-900 cursor-pointer"
        aria-label={`Play: ${video.title}`}
      >
        {/* Show poster image if available, otherwise dark gradient */}
        {video.poster ? (
          <Image
            src={video.poster}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
            <RiPlayCircleLine className="text-white/30" size={64} />
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-white/95 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <RiPlayCircleLine className="text-primary" size={36} />
          </span>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
          <RiTimeLine size={12} />
          {video.duration}
        </span>
      </button>

      {/* Card body */}
      <div className="p-5 w-full">
        <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2 w-full">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
          {video.description}
        </p>

        {/* Watch button */}
        {/* <button
          type="button"
          onClick={() => onPlay(video)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
        >
          <RiPlayCircleLine size={16} />
          Watch Now
          <RiArrowRightLine size={14} />
        </button> */}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */

export function EVChargingLearning(): React.ReactElement {
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Video Blog"
          title="EV Charging Video Guides"
          description="Watch our video presentations to learn everything about EV charging — from the basics to expert tips for getting the most out of your electric vehicle."
        />

        {/* Video grid — centered for when there are fewer items */}
        <div className="w-full flex justify-center">
          {VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={setActiveVideo}
            />
          ))}
        </div>

        {/* CTA for more videos */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            More video guides coming soon. Subscribe to stay updated on the latest
            EV charging tutorials and product walkthroughs.
          </p>
        </div>
      </LayoutContainer>

      {/* Video modal */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
