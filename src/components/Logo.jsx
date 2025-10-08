cat > ~/aether/src/components/Logo.jsx << 'EOF'
import React from 'react';

/**
 * Cipher Bloom Logo component (inline SVG)
 * Uses CSS variables for color so it matches the theme.
 */
export default function Logo({ size = 40 }) {
  return (
    <svg
      className="cipher-logo"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="var(--cipher-accent)" stopOpacity="1"/>
          <stop offset="100%" stopColor="var(--cipher-primary)" stopOpacity="0.95"/>
        </radialGradient>
      </defs>

      <!-- outer ring -->
      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--cipher-neutral)" strokeWidth="2.5" opacity="0.12"/>

      <!-- bloom petals -->
      <g transform="translate(0,0)" fill="url(#g1)">
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(0 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(45 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(90 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(135 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(180 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(225 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(270 32 32)"/>
        <path d="M32 8c6 0 10 6 10 6s-4 6-10 6-10-6-10-6 4-6 10-6z" transform="rotate(315 32 32)"/>
      </g>

      <!-- center dot / cipher core -->
      <circle cx="32" cy="32" r="6" fill="var(--cipher-neutral)" stroke="var(--cipher-primary)" strokeWidth="1.5"/>
    </svg>
  );
}
EOF
