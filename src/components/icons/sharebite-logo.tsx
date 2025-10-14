
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
      <defs>
        <clipPath id="clip0_101_2">
          <rect width="128" height="128" rx="28" fill="white" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip0_101_2)">
        <rect width="128" height="128" fill="#2563EB" />
        
        {/* Hand */}
        <path
          d="M87.62,94.13c-4.57-2.3-9.45-3.6-14.58-3.6-4.05,0-7.96,0.76-11.56,2.15-7.85,3.01-13.6,9.13-18.06,15.27-1.12,1.5-2.84,2.43-4.8,2.43-3.48,0-6.3-2.82-6.3-6.3,0-1.93,0.86-3.65,2.26-4.8,7-6.13,16.03-10.7,26-12.4-2.6-2.6-4.2-6.2-4.2-10.2,0-7.44,6.06-13.5,13.5-13.5s13.5,6.06,13.5,13.5c0,3.97-1.6,7.54-4.2,10.2,10.3,1.5,20,6.2,26.8,12.7,1.35,1.2,2.2,2.9,2.2,4.7,0,3.48-2.82,6.3-6.3,6.3-2.14,0-4.08-0.9-5.46-2.35Z"
          fill="#F97316"
        />

        {/* Bowl */}
        <path
          d="M103,72H25c-2.21,0-4-1.79-4-4v-4c0-8.84,7.16-16,16-16h56c8.84,0,16,7.16,16,16v4c0,2.21-1.79,4-4,4Z"
          fill="#FBBF24"
        />

        {/* Food Items */}
        <path d="M70.1,58.33A6.47,6.47,0,0,1,76,55.6a5,5,0,0,0-4.2-2.9,5.88,5.88,0,0,0-7.6,4.87,6.5,6.5,0,0,1,5.9.76Z" fill="#D97706"/>
        <path d="M57.6,50.4a6.5,6.5,0,0,1,6.5-6.5,5,5,0,0,0-5-5,6.5,6.5,0,0,0-6.5,6.5,5,5,0,0,0,5,5Z" fill="#D97706"/>
        <path d="M83,62.1a6.5,6.5,0,0,1,5.6-3.4,5,5,0,0,0-3.4-5.6,6.5,6.5,0,0,0-5.6,3.4,5,5,0,0,0,3.4,5.6Z" fill="#F59E0B"/>
        <path d="M62,43.3c-4.69,0-8.5,3.81-8.5,8.5s3.81,8.5,8.5,8.5,8.5-3.81,8.5-8.5-3.81-8.5-8.5-8.5Z" fill="#16A34A"/>
        <path d="M49.3,55.3c-4.69,0-8.5,3.81-8.5,8.5s3.81,8.5,8.5,8.5,8.5-3.81,8.5-8.5-3.81-8.5-8.5-8.5Z" fill="#D97706"/>
        <path d="M72,66a5.5,5.5,0,0,0-11,0Z" fill="white"/>
        <path d="M61,66a5.5,5.5,0,0,0-11,0Z" fill="white"/>
        <path d="M81,66a5.5,5.5,0,0,0-11,0Z" fill="white"/>

        {/* Wifi Symbol */}
        <path
          d="M80,39c-8.8,0-17.6,3.5-24,10"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M72,47c-4.4,0-8.8,1.8-12,5"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <text
        fill="white"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        fontFamily="sans-serif"
        fontSize="16"
        fontWeight="bold"
        letterSpacing="0.025em"
      >
        <tspan x="26" y="118">ShareBite</tspan>
      </text>
    </svg>
  );
}
