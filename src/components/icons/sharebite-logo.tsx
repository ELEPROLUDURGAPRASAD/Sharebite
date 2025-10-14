
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
          {`.sharebite-text { font-family: 'Belleza', sans-serif; font-size: 20px; fill: #273222; }`}
        </style>
      </defs>
      <path d="M40.1654 114.667C24.5134 114.667 11.832 101.986 11.832 86.3333V41.6667C11.832 26.0147 24.5134 13.3333 40.1654 13.3333H87.832C103.484 13.3333 116.165 26.0147 116.165 41.6667V86.3333C116.165 101.986 103.484 114.667 87.832 114.667H40.1654Z" fill="#F97316"/>
      <path d="M64 88C77.2548 88 88 77.2548 88 64C88 50.7452 77.2548 40 64 40C50.7452 40 40 50.7452 40 64C40 77.2548 50.7452 88 64 88Z" fill="#FDF3E6"/>
      <path d="M64 82.6667C74.3051 82.6667 82.6667 74.3051 82.6667 64C82.6667 53.6949 74.3051 45.3333 64 45.3333C53.6949 45.3333 45.3333 53.6949 45.3333 64C45.3333 74.3051 53.6949 82.6667 64 82.6667Z" fill="#F97316" stroke="#FDF3E6" strokeWidth="2.66667"/>
      <path d="M64 77.3333C70.9411 77.3333 76.6667 71.6078 76.6667 64.6667C76.6667 57.7255 70.9411 52 64 52C57.0589 52 51.3333 57.7255 51.3333 64.6667C51.3333 71.6078 57.0589 77.3333 64 77.3333Z" fill="#FDF3E6"/>
      <path d="M56 61.3333L64 54L72 61.3333" stroke="#F97316" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M64 54V72" stroke="#F97316" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="30" y="36" className="sharebite-text">ShareBite</text>
    </svg>
  );
}
