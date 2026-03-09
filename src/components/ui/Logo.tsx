"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * FuelDrop logo: droplet + motion line suggesting delivery/speed.
 * Clean, professional, associated with fuel and convenience.
 */
export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-slate-900 no-underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded ${className}`}
      aria-label="FuelDrop — Home"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
        {/* Droplet shape (fuel drop) with subtle motion line */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden
        >
          <path d="M12 2.5c-.5 0-1 .2-1.4.6L8.2 6.4C6.8 7.8 6 9.8 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-2.2-.8-4.2-2.2-5.6l-2.4-3.3c-.4-.4-.9-.6-1.4-.6z" />
        </svg>
        {/* Small speed line */}
        <span className="absolute -right-1 top-1/2 h-1 w-2 -translate-y-1/2 rounded-full bg-sky-300 opacity-90" />
      </span>
      {showText && (
        <span className="text-xl font-semibold tracking-tight">FuelDrop</span>
      )}
    </Link>
  );
}
