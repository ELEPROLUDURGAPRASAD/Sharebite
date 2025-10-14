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

        {/* Hand */}
        <path
          d="M 20 90 C 10 90, 5 80, 15 70 C 25 60, 75 60, 85 70 C 95 80, 90 90, 80 90 L 20 90 Z"
          fill="hsl(var(--secondary))"
          transform="translate(0, 5)"
        />

        {/* Bowl */}
        <path
          d="M 25 70 C 25 55, 35 50, 50 50 C 65 50, 75 55, 75 70 Z"
          fill="hsl(var(--background))"
        />

        {/* Food elements */}
        <circle cx="50" cy="55" r="5" fill="#f59e0b" /> {/* Orange */}
        <circle cx="40" cy="60" r="4" fill="#84cc16" /> {/* Green */}
        <circle cx="60" cy="60" r="4" fill="#ef4444" /> {/* Red */}
        <rect x="48" y="45" width="4" height="8" rx="2" fill="#a3e635" transform="rotate(15 50 50)" />

        {/* Sharing/Wifi Symbol */}
        <g stroke="hsl(var(--primary-foreground))" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M 40 35 A 15 15 0 0 1 60 35" />
          <path d="M 32 42 A 25 25 0 0 1 68 42" />
        </g>
      </g>
    </svg>
  );
}

export default ShareBiteLogo;
