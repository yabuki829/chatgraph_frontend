import React from 'react'

const Loading = () => {
  return (
    <div className="">
      <svg 
      className='w-16 h-16 rounded-full ' 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    x="0px" 
    y="0px" 
    width="48px" 
    viewBox="0 0 48 34"
>
  <defs>
    <clipPath id="mask">
      <polygon transform="rotate(180 18 11)" points="10,15.2 13.5,10.9 23.2,20.8 35.7,7.9 35.7,0 10,0 " />
    </clipPath>
  </defs>

  <g transform="rotate(180 18 11)" clipPath="url(#mask)">
    <rect x="0" y="0" width="7" height="14" fill="#FF4F02">
      <animateTransform 
          attributeType="xml" 
          attributeName="transform" 
          type="scale" 
          values="1,1; 1,1.5; 1,1" 
          begin="0.4s" 
          dur="0.8s" 
          repeatCount="indefinite" 
      />
    </rect>
    <rect x="9" y="0" width="7" height="19" fill="#2C7CFF">
      <animateTransform 
          attributeType="xml" 
          attributeName="transform" 
          type="scale" 
          values="1,0.2; 1,1.2; 1,0.2" 
          begin="0.3s" 
          dur="0.8s" 
          repeatCount="indefinite" 
      />
    </rect>
    <rect x="18" y="0" width="8" height="14" fill="#00CC00">
      <animateTransform 
          attributeType="xml" 
          attributeName="transform" 
          type="scale" 
          values="1,0.2; 1,1.5; 1,0.2" 
          begin="0s" 
          dur="0.8s" 
          repeatCount="indefinite" 
      />
    </rect>
  </g>

  <polygon fill="#2C7CFF" points="38.6,2 41.4,4.2 36.1,10.2 29.5,17 26.8,19.8 23.3,23.3 19.9,19.8 17.1,17 13.7,13.5 10.2,17.7 0,30.2 10,20.8 10,34 16.9,34 16.9,22.2 19.7,25.1 19.7,34 26.7,34 26.7,25.3 29.5,22.5 29.5,34 36.4,34 36.4,15.5 44.1,7.1 46.4,9.7 48,0" />
</svg>
    </div>
  )
}

export default Loading