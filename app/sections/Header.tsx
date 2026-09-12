'use client';

import React from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between py-2">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#111111]">
        SINGULARITY
      </div>

      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="group flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
      >
        <span className="relative block h-4 w-6">
          <span className="absolute left-0 right-0 top-0 h-[1.5px] bg-[#111111] transition-transform group-hover:-translate-y-0.5" />
          <span className="absolute left-0 right-0 top-[7px] h-[1.5px] bg-[#111111] transition-opacity" />
          <span className="absolute left-0 right-0 top-[14px] h-[1.5px] bg-[#111111] transition-transform group-hover:translate-y-0.5" />
        </span>
      </button>
    </header>
  );
}
