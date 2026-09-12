'use client';

import React, { useState, useEffect } from 'react';
import { Map, MapControls, MapMarker, MarkerContent } from '@/components/ui/map';

interface FooterMapProps {
  center?: [number, number];
  zoom?: number;
  locationName?: string;
  mapsUrl?: string;
}

export default function FooterMap({
  center = [72.972125, 19.243694],
  zoom = 15,
  locationName = 'K.C. College of Engg., Thane',
  mapsUrl = 'https://maps.app.goo.gl/G942eSt3u9vaFEiQ6',
}: FooterMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#F5F5F7] animate-pulse flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-[#111111]/40 font-mono">
          Loading Map...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#F5F5F7] shadow-sm relative group/map">
        <Map center={center} zoom={zoom} className="h-full w-full">
          <MapControls position="top-right" />
          <MapMarker longitude={center[0]} latitude={center[1]}>
            <MarkerContent>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="K.C. College of Engineering & Management Studies & Research"
                className="relative flex items-center justify-center cursor-pointer group/pin"
              >
                <span className="absolute -inset-2.5 rounded-full bg-blue-500/35 animate-ping" />
                <div className="relative w-5 h-5 rounded-full bg-[#111111] border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover/pin:scale-125">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </a>
            </MarkerContent>
          </MapMarker>
        </Map>
      </div>
      <div className="mt-3 w-full flex items-center justify-between px-1 text-[0.72rem] tracking-wider uppercase text-[#111111]/60">
        <span className="font-medium text-[#111111]/80 truncate max-w-[70%]">
          {locationName}
        </span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#111111] hover:text-blue-600 transition-colors shrink-0 ml-2"
        >
          Open in Maps &rarr;
        </a>
      </div>
    </div>
  );
}
