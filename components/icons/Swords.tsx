
import React from 'react';

export const Swords: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m21.174 6.812-7.85-5.233a.6.6 0 0 0-.648 0l-7.85 5.233a.6.6 0 0 0-.326.53v8.316a.6.6 0 0 0 .326.53l7.85 5.233a.6.6 0 0 0 .648 0l7.85-5.233a.6.6 0 0 0 .326-.53V7.342a.6.6 0 0 0-.326-.53Z" />
    <path d="m12 22 4-10-8 4 4 6" />
    <path d="m12 2 4 10-8-4-4-6" />
  </svg>
);
