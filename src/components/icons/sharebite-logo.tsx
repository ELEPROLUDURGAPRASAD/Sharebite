
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
      <g>
        <rect width="128" height="128" rx="28" fill="hsl(var(--primary))" />
        <path
          d="M45,64 C45,45 60,30 75,30 C90,30 100,45 100,64 C100,83 85,98 64,98 C43,98 45,83 45,64 Z"
          fill="white"
          transform="rotate(15, 64, 64)"
        />
        <path
          d="M60,64 C60,55 65,50 72,50 C79,50 84,55 84,64 C84,73 79,78 72,78 C65,78 60,73 60,64 Z"
          fill="hsl(var(--primary))"
          transform="rotate(15, 64, 64)"
        />
      </g>
    </svg>
  );
}
