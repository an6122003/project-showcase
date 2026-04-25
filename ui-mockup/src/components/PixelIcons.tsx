import React from 'react';

export const PixelAvatar = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4h8v2h-8V4zm-2 2h2v2h-2V6zm-2 2h2v4H8V8zm12 0h2v4h-2V8zm2 4h2v8h-2v-8zm-16 0h2v4H6v-4zm0 4H4v6h2v-6zm18 4h-2v4h-2v2h-8v-2H8v-4H6v4h2v2h2v2h8v-2h2v-2h2v-4zm-8-6h-4v2h4v-2zm-6-2h2v2H8v-2zm12 0h-2v2h2v-2z" />
    <path d="M10 14h4v2h-4v-2zm8 0h4v2h-4v-2zm-4 4h4v2h-4v-2z" fill="#000" />
  </svg>
);

export const PixelComputer = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h16v2H8V6zm-2 2h2v12H6V8zm18 0h-2v12h2V8zM6 20h20v2H6v-2zm8 2h4v2h-4v-2zm-6 2h16v2H8v-2zm-2 2h20v2H6v-2z" />
    <path d="M10 10h12v6H10v-6z" fill="#000" fillOpacity="0.2"/>
  </svg>
);

export const PixelHammer = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 24h4v4H6v-4zm4-4h4v4h-4v-4zm4-4h4v4h-4v-4zm4-4h4v4h-4v-4zm-2-8h6v2h-6V4zm6 2h2v6h-2V6zm-2 6h-6v2h6v-2zm-6-2h-2V6h2v4z" />
  </svg>
);

export const PixelCheck = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 22h4v-4h4v-4h4V10h-4v4h-4v4h-4v-4H10v4h4v4z" />
    <path d="M22 6h4v4h-4V6zM6 14h4v4H6v-4z" />
  </svg>
);

export const PixelGlobe = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4h8v2h-8V4zm-4 4h4v-2h-4v2zm12 -2h4v2h-4v-2zm2 2h2v6h-2V8zm0 10h-2v6h2v-6zm-16-6h2v-6H6v6zm0 2h2v6H6v-6zm4 6h4v2h-4v-2zm8 0h4v-2h-4v2zm-2-4h-4v4h4v-4zm0-8h-4v6h4v-6zm0-4h-4v2h4v-2zm-6 2H8v4h2v-4zm12 0h-2v4h2v-4z" />
  </svg>
);

export const PixelCamera = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8h12v2H8V8zm-2 2h2v10H6V10zm14 0h-2v10h2v-10zm0 2h4v-2h-4v2zm4-2h2v6h-2v-6zm0 6h-4v2h4v-2zM8 20h12v2H8v-2zm4-8h4v4h-4v-4z" />
  </svg>
);
