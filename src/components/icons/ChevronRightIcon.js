import React from 'react';

export default function ChevronRightIcon({ fill = 'currentColor', className, ...props }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill={fill}
      aria-hidden="true"
      {...props}
    >
      <path d="M5.16973 7L0.219727 2.05L1.63973 0.639999L7.99973 7L1.63973 13.36L0.219727 11.95L5.16973 7Z" />
    </svg>
  );
}
