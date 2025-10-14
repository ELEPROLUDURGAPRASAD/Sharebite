import { cn } from '@/lib/utils';
import React from 'react';

export function ShareBiteLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={cn(className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="160" height="160" rx="40" fill="#2586e9" />
      <g transform="translate(15, 0)">
        <path
          d="M62 46.8C55.4 46.8 50 49.5 50 52.8C50 56.1 55.4 58.8 62 58.8C68.6 58.8 74 56.1 74 52.8C74 49.5 68.6 46.8 62 46.8Z"
          fill="#fce284"
        />
        <path
          d="M93.399 74.372C89.599 70.572 80.899 65.072 61.999 65.072C43.099 65.072 34.399 70.572 30.599 74.372C25.499 79.572 21.199 88.072 21.199 94.072L102.799 94.072C102.799 88.072 98.499 79.572 93.399 74.372Z"
          fill="#f4a23a"
        />
        <path
          d="M21.2 94.1C21.2 94.1 21.2 94.1 21.2 94.1C21.2 94.1 22.3 97.4 26.2 99.1C30.1 100.8 34.9 100.8 38.6 100.5C42.3 100.2 47.9 99.2 55.3 99.2C61.9 99.2 68.6 99.8 74.5 100.3C80.4 100.8 86.8 101.2 91.8 99.8C96.8 98.4 102.8 94.1 102.8 94.1H21.2Z"
          fill="#e9882a"
        />
        <path d="M47 31C47 28.8 48.8 27 51 27C53.2 27 55 28.8 55 31C55 33.2 53.2 35 51 35C48.8 35 47 33.2 47 31Z" fill="#fff" />
        <path d="M62 31C62 28.8 63.8 27 66 27C68.2 27 70 28.8 70 31C70 33.2 68.2 35 66 35C63.8 35 62 33.2 62 31Z" fill="#fff" />
        <path d="M77 31C77 28.8 78.8 27 81 27C83.2 27 85 28.8 85 31C85 33.2 83.2 35 81 35C78.8 35 77 33.2 77 31Z" fill="#fff" />
        <path d="M36 65H48C48 59.5 43.5 55 38 55V65H36Z" fill="#d57422" />
        <path d="M57 53C57 53 59.2 47.3 65 47C70.8 46.7 73 53 73 53L57 53Z" fill="#4fb443" />
        <path d="M75 56H88V63H75V56Z" fill="#f4a23a" />
        <path d="M83.8 53.2C81.6 51.5 79.5 51.2 77 52C77.8 49.3 80.1 48 82.5 48C85.5 48 88 50.2 88 53.2H83.8Z" fill="#f4a23a" />
        <path d="M91.5 47C88.5 47 86 49.2 86 52.2C86 54.1 87.1 55.7 88.6 56.5C91.1 55.3 92.5 52.9 92.5 50C92.5 48.3 92.1 47.6 91.5 47Z" fill="#d57422" />
        <path d="M52 51C52 48.8 50.2 47 48 47C45.8 47 44 48.8 44 51H52Z" fill="#d57422" />
      </g>
      <text
        x="50%"
        y="85%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        ShareBite
      </text>
    </svg>
  );
}
