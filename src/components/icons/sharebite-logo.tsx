
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
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#255EB3', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        <rect width="128" height="128" rx="28" fill="url(#grad1)" />
        <path 
          d="M60.5,30 C75,30 85,40 85,55 C85,68 75,75 64,80 C53,85 45,92 45,100 C45,108 52,112 60,112 C75,112 85,105 85,95"
          stroke="white" 
          strokeWidth="10" 
          fill="none" 
          strokeLinecap="round"
        />
        <path 
          d="M68,71 C78,66 82,58 82,50 C82,40 75,34 66,34"
          stroke="#F5A623"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
         <path 
          d="M85,55 C85,45 78,38 70,38"
          stroke="#FFFFFF"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
