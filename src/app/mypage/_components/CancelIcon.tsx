import * as React from 'react';
import { SVGProps } from 'react';

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={24} 
    height={24} 
    viewBox="0 0 24 24" 
    fill="none" 
    {...props}
  >
    <path 
      d="M24 8L8 24" 
      stroke="#616161" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 8L24 24" 
      stroke="#616161" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default CancelIcon;
