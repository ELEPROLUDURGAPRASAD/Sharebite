
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
      role="img"
      aria-labelledby="sharebite-logo-title"
    >
      <title id="sharebite-logo-title">ShareBite Logo</title>
      <g>
        {/* Hand */}
        <path d="M96.5,83.2c-5.4-2.2-11.2-3.4-17.3-3.4c-4.8,0-9.4,0.9-13.7,2.5c-9.3,3.6-16.1,10.8-21.4,18.1 c-1.3,1.8-3.4,2.9-5.7,2.9c-4.1,0-7.5-3.4-7.5-7.5c0-2.3,1-4.3,2.7-5.7c8.3-7.3,19-12.7,30.8-14.7c-3.1-3.1-5-7.4-5-12.1 c0-8.8,7.2-16,16-16s16,7.2,16,16c0,4.7-1.9,8.9-5,12.1c12.2,1.8,23.3,7.4,31.7,15.1c1.6,1.4,2.6,3.4,2.6,5.6 c0,4.1-3.4,7.5-7.5,7.5C100,101.3,97.8,100.2,96.5,83.2z" fill="#FBBF24"/>
        
        {/* Bowl */}
        <path d="M104,74H24c-2.2,0-4-1.8-4-4v-4c0-8.8,7.2-16,16-16h56c8.8,0,16,7.2,16,16v4C108,72.2,106.2,74,104,74z" fill="#EA580C"/>
        
        {/* Food elements */}
        {/* Rice */}
        <circle cx="50" cy="62" r="3" fill="#FFFFFF"/>
        <circle cx="58" cy="65" r="2.5" fill="#FFFFFF"/>
        <circle cx="67" cy="61" r="3" fill="#FFFFFF"/>
        <circle cx="75" cy="64" r="2" fill="#FFFFFF"/>
        <circle cx="45" cy="68" r="2" fill="#FFFFFF"/>

        {/* Veggies */}
        <rect x="35" y="60" width="8" height="5" rx="2" transform="rotate(-15 35 60)" fill="#16A34A"/>
        <rect x="80" y="58" width="10" height="4" rx="2" fill="#CA8A04"/>
        
        {/* Meat */}
        <path d="M60,56 a8,5 0 0,1 12,2 a6,4 0 0,0 -5,-3 a7,6 0 0,0 -9,4 Z" fill="#D97706" />

        {/* Leaves */}
        <path d="M75 55 c -5 -5, -10 5, 0 5z" fill="#16A34A"/>
        <path d="M40 58 c -5 -5, -10 5, 0 5z" fill="#16A34A"/>

        {/* Wifi Symbol */}
        <path d="M44,40 a28,28 0 0,1 40,0" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M52,46 a18,18 0 0,1 24,0" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <circle cx="64" cy="52" r="4" fill="#3B82F6"/>
      </g>
       <text
        fill="hsl(var(--foreground))"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        fontFamily="Belleza, sans-serif"
        fontSize="22"
        fontWeight="bold"
        letterSpacing="0em"
      >
        <tspan x="26" y="118">ShareBite</tspan>
      </text>
    </svg>
  );
}
