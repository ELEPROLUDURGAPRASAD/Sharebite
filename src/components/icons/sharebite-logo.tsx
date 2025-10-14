
import { cn } from '@/lib/utils';
import React from 'react';

export function ShareBiteLogo({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={cn(className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`.sharebite-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-weight: bold; font-size: 18px; fill: white; }`}
        </style>
      </defs>
      <rect width="128" height="128" rx="28" fill="#2563EB" />
      
      {/* Bowl and Hand */}
      <path d="M28 80.5C31.2889 79.5444 45.4 75.2 50.5 75.5C57.5 76 77.5 83 80.5 84C85.5 85.5 91.5 86.5 95 82.5C98.5 78.5 95.7333 76.8 93.5 75C89.5 72 80.8333 70.1667 76.5 70H50.5C40.5 70 33.5 71.5 30 73.5C27.5 75 26.5 77.5 28 80.5Z" fill="#F97316"/>
      <path d="M34.5 70C34.5 63.5 39.8333 59.8333 46.5 59.5H81.5C88.1667 59.8333 93.5 63.5 93.5 70H34.5Z" fill="#FBBF24"/>

      {/* Food items */}
      <path d="M57.5 48C57.5 44.5 59.5 42 63.5 42C67.5 42 69.5 44.5 69.5 48V59.5H57.5V48Z" fill="#22C55E"/>
      <path d="M51 60C51 60 52 56 55 54C58 52 61 54 61 54L59 60H51Z" fill="#16A34A"/>

      <path d="M41.5 60V53C41.5 50 43.5 48 46.5 48C49.5 48 51.5 50 51.5 53V60H41.5Z" fill="#F97316"/>
      <path d="M51.5 53C51.5 50.5 50 49 48 49C46 49 45.5 50.5 45.5 52.5" stroke="#FDBA74" strokeWidth="1" strokeLinecap="round"/>

      <path d="M68 60V52C68 49.5 69.5 47.5 72 47.5C74.5 47.5 76 49.5 76 52V60H68Z" fill="#A16207"/>
      
      <path d="M75 60V54C75 51.5 76.5 49.5 79 49.5C81.5 49.5 83 51.5 83 54V60H75Z" fill="#FBBF24"/>

      {/* Rice */}
      <path d="M63 59.5C61.8333 60.1667 60.5 61 60 62H66C65.5 61 64.1667 60.1667 63 59.5Z" fill="white" />
      <path d="M72 59.5C70.8333 60.1667 69.5 61 69 62H75C74.5 61 73.1667 60.1667 72 59.5Z" fill="white" />
      <path d="M80 59.5C78.8333 60.1667 77.5 61 77 62H83C82.5 61 81.1667 60.1667 80 59.5Z" fill="white" />
      
      {/* Signal */}
      <path d="M54 44C57.3333 41.3333 64.4 39.2 74 42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M58 38C60.5 36 65.6 34.4 71.5 36.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Text */}
      <text x="24" y="106" className="sharebite-text">ShareBite</text>
    </svg>
  );
}
