
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
      <style>
        {`
          .hand-fill { fill: hsl(var(--primary)); }
          .bowl-fill { fill: hsl(var(--accent)); }
          .food-item-1 { fill: #16A34A; }
          .food-item-2 { fill: #D97706; }
          .food-item-3 { fill: #FFFFFF; }
          .wifi-stroke { stroke: hsl(var(--primary-foreground)); }
          .text-fill { fill: hsl(var(--primary-foreground)); }
        `}
      </style>
       <rect width="128" height="128" rx="28" fill="hsl(var(--background))" />
       <path
        d="M87.62,94.13c-4.57-2.3-9.45-3.6-14.58-3.6-4.05,0-7.96,0.76-11.56,2.15-7.85,3.01-13.6,9.13-18.06,15.27-1.12,1.5-2.84,2.43-4.8,2.43-3.48,0-6.3-2.82-6.3-6.3,0-1.93,0.86-3.65,2.26-4.8,7-6.13,16.03-10.7,26-12.4-2.6-2.6-4.2-6.2-4.2-10.2,0-7.44,6.06-13.5,13.5-13.5s13.5,6.06,13.5,13.5c0,3.97-1.6,7.54-4.2,10.2,10.3,1.5,20,6.2,26.8,12.7,1.35,1.2,2.2,2.9,2.2,4.7,0,3.48-2.82,6.3-6.3,6.3-2.14,0-4.08-0.9-5.46-2.35Z"
        className="hand-fill"
      />
      <path
        d="M103,72H25c-2.21,0-4-1.79-4-4v-4c0-8.84,7.16-16,16-16h56c8.84,0,16,7.16,16,16v4c0,2.21-1.79,4-4,4Z"
        className="bowl-fill"
      />
      <path d="M70.1,58.33A6.47,6.47,0,0,1,76,55.6a5,5,0,0,0-4.2-2.9,5.88,5.88,0,0,0-7.6,4.87,6.5,6.5,0,0,1,5.9.76Z" className="food-item-2"/>
      <path d="M57.6,50.4a6.5,6.5,0,0,1,6.5-6.5,5,5,0,0,0-5-5,6.5,6.5,0,0,0-6.5,6.5,5,5,0,0,0,5,5Z" className="food-item-2"/>
      <path d="M83,62.1a6.5,6.5,0,0,1,5.6-3.4,5,5,0,0,0-3.4-5.6,6.5,6.5,0,0,0-5.6,3.4,5,5,0,0,0,3.4,5.6Z" className="bowl-fill"/>
      <path d="M62,43.3c-4.69,0-8.5,3.81-8.5,8.5s3.81,8.5,8.5,8.5,8.5-3.81,8.5-8.5-3.81-8.5-8.5-8.5Z" className="food-item-1"/>
      <path d="M49.3,55.3c-4.69,0-8.5,3.81-8.5,8.5s3.81,8.5,8.5,8.5,8.5-3.81,8.5-8.5-3.81-8.5-8.5-8.5Z" className="food-item-2"/>
      <path d="M72,66a5.5,5.5,0,0,0-11,0Z" className="food-item-3"/>
      <path d="M61,66a5.5,5.5,0,0,0-11,0Z" className="food-item-3"/>
      <path d="M81,66a5.5,5.5,0,0,0-11,0Z" className="food-item-3"/>
      <path d="M64,20 A24,24 0 0,1 88,44" stroke="hsl(var(--primary))" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M64,28 A16,16 0 0,1 80,44" stroke="hsl(var(--primary))" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="64" cy="44" r="4" fill="hsl(var(--primary))" />
    </svg>
  );
}
