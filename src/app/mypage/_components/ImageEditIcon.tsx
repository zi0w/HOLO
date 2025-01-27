import * as React from 'react';
import { SVGProps } from 'react';

const ImageEditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={32} 
    height={32} 
    viewBox="0 0 32 32" 
    fill="none" 
    {...props}
  >
    <circle cx="16" cy="16" r="15.5" fill="#FF7600" stroke="#FFF8EE"/>
    <g transform="translate(8, 8) scale(1)">
      <path 
        d="M15.3334 12.6667C15.3334 13.0203 15.1929 13.3594 14.9429 13.6095C14.6928 13.8595 14.3537 14 14.0001 14H2.00008C1.64646 14 1.30732 13.8595 1.05727 13.6095C0.807224 13.3594 0.666748 13.0203 0.666748 12.6667V5.33333C0.666748 4.97971 0.807224 4.64057 1.05727 4.39052C1.30732 4.14048 1.64646 4 2.00008 4H4.66675L6.00008 2H10.0001L11.3334 4H14.0001C14.3537 4 14.6928 4.14048 14.9429 4.39052C15.1929 4.64057 15.3334 4.97971 15.3334 5.33333V12.6667Z" 
        stroke="#FFF8EE" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7.99992 11.3333C9.47268 11.3333 10.6666 10.1394 10.6666 8.66667C10.6666 7.19391 9.47268 6 7.99992 6C6.52716 6 5.33325 7.19391 5.33325 8.66667C5.33325 10.1394 6.52716 11.3333 7.99992 11.3333Z" 
        stroke="#FFF8EE" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </g>
   </svg>
);

export default ImageEditIcon;



