import * as React from 'react';

function ShareBiteLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="clip">
          <rect width="200" height="200" rx="40" ry="40" />
        </clipPath>
        <filter id="drop-shadow" x="-0.5" y="-0.5" width="2" height="2">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feOffset in="blur" dx="0" dy="1" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
                <feMergeNode in="shadow"/>
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>

      <g clipPath="url(#clip)">
        <rect width="200" height="200" fill="#2586E8" />

        <g transform="translate(0, -5)" filter="url(#drop-shadow)">
          {/* Hand */}
          <path
            d="M57,112.5 C42,112.5 35,123 35,130 C35,137 40,145 60,145 C80,145 140,145 155,145 C165,145 170,140 170,135 C170,128 160,120 150,120 L80,120 C75,120 75,112.5 70,112.5 L57,112.5 Z"
            fill="#F28F3B"
          />

          {/* Bowl */}
          <path
            d="M45,115 C45,100 60,90 100,90 C140,90 155,100 155,115 Z"
            fill="#FCD96A"
          />

          {/* Food Items */}
          {/* Rice */}
          <circle cx="100" cy="98" r="10" fill="#FFFFFF" />
          <circle cx="110" cy="99" r="8" fill="#FFFFFF" />
          <circle cx="92" cy="99" r="8" fill="#FFFFFF" />
          
          {/* Broccoli */}
          <path d="M85 85 C 80 80, 90 70, 98 75 C 105 70, 115 80, 110 85 Z" fill="#4CAF50" />
          <rect x="95" y="85" width="5" height="10" fill="#66BB6A" />

          {/* Pakora/Cutlet 1 (left) */}
          <path
            d="M65,95 a 15,12 0 1,1 30,0 a 15,12 0 1,1 -30,0"
            fill="#D97706"
            transform="rotate(-15, 80, 95)"
          />
           <path
            d="M72,90 a 5,3 0 1,1 10,0 a 5,3 0 1,1 -10,0"
            fill="#F59E0B"
            transform="rotate(-15, 80, 95)"
          />
          
          {/* Yellow item (right) */}
          <circle cx="125" cy="90" r="12" fill="#FBBF24" />
          <circle cx="129" cy="86" r="3" fill="#FDE68A" />

           {/* Pakora/Cutlet 2 (far right) */}
          <path d="M135,85 a 12,10 0 1,1 24,0 a 12,10 0 1,1 -24,0" fill="#A16207" />
          <path d="M140,82 a 4,2.5 0 1,1 8,0 a 4,2.5 0 1,1 -8,0" fill="#CA8A04" />


          {/* Wifi Symbol */}
          <path
            d="M 80 55 A 30 30 0 0 1 120 55"
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 70 65 A 45 45 0 0 1 130 65"
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        
        {/* Text */}
        <text
          x="100"
          y="175"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          ShareBite
        </text>
      </g>
    </svg>
  );
}

export default ShareBiteLogo;
