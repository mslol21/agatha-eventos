import React from "react";

export const PopcornCartIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cart Awning / Toldo Striped */}
    <path
      d="M4 8C4 6.89543 4.89543 6 6 6H26C27.1046 6 28 6.89543 28 8V10H4V8Z"
      fill="#E11D48"
    />
    <path d="M7 6H11V10H7V6Z" fill="#FFFFFF" opacity="0.9" />
    <path d="M15 6H19V10H15V6Z" fill="#FFFFFF" opacity="0.9" />
    <path d="M23 6H27V10H23V6Z" fill="#FFFFFF" opacity="0.9" />

    {/* Popcorn Box / Glass Body */}
    <rect
      x="6"
      y="10"
      width="20"
      height="12"
      rx="2"
      fill="#FFF1F2"
      stroke="#E11D48"
      strokeWidth="1.5"
    />

    {/* Popcorn Fluffs inside cart */}
    <circle cx="10" cy="14" r="2.5" fill="#FDE047" />
    <circle cx="13.5" cy="13" r="2" fill="#FACC15" />
    <circle cx="16" cy="14.5" r="2.5" fill="#FEF08A" />
    <circle cx="19" cy="13" r="2" fill="#FDE047" />
    <circle cx="22" cy="14.5" r="2.5" fill="#FACC15" />

    {/* Cart Base Frame */}
    <path d="M5 22H27V24H5V22Z" fill="#E11D48" />

    {/* Left Wheel */}
    <circle cx="10" cy="26" r="3.5" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.5" />
    <circle cx="10" cy="26" r="1" fill="#E11D48" />

    {/* Right Wheel */}
    <circle cx="22" cy="26" r="3.5" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.5" />
    <circle cx="22" cy="26" r="1" fill="#E11D48" />

    {/* Cart Handle / Leg Stand */}
    <path d="M16 22V28" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
