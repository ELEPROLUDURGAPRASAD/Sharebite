import * as React from 'react';

function ShareBiteLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="logo-clip-path">
          <rect width="100" height="100" rx="22" />
        </clipPath>
      </defs>

      <g clipPath="url(#logo-clip-path)">
        {/* Background */}
        <rect width="100" height="100" fill="hsl(var(--primary))" />

        {/* Heart/Bowl Shape */}
        <path
          d="M50 35 C 30 35, 20 55, 20 65 C 20 85, 50 95, 50 95 C 50 95, 80 85, 80 65 C 80 55, 70 35, 50 35 Z"
          fill="hsl(var(--background))"
          stroke="hsl(var(--background))"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Sprout */}
        <g transform="translate(0, -5)">
          <path
            d="M50 65 C 50 55, 55 50, 55 50"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M45 50 C 45 45, 50 40, 55 40"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

export default ShareBiteLogo;
