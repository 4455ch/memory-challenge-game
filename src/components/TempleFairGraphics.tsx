import React from 'react';

/**
 * Pure SVG Decorative Graphics inspired by Thai Temple Fair (เทศกาลเที่ยวงานวัด)
 * Matches the poster: Ferris Wheel, Striped Carousel/Tents, Balloon Dart Stall, Fireworks, and Parchment Scroll
 */

export const FireworkBurst: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central Core */}
    <circle cx="32" cy="32" r="3" fill="#F39200" />
    <circle cx="32" cy="32" r="1.5" fill="#FED130" />
    {/* Radiating Sparks */}
    <line x1="32" y1="14" x2="32" y2="4" stroke="#C2272D" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="50" x2="32" y2="60" stroke="#C2272D" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="32" x2="4" y2="32" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="32" x2="60" y2="32" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Diagonal Sparks */}
    <line x1="19" y1="19" x2="11" y2="11" stroke="#F39200" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="45" x2="53" y2="53" stroke="#F39200" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="19" x2="53" y2="11" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <line x1="19" y1="45" x2="11" y2="53" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    {/* Fine Secondary Rays */}
    <line x1="25" y1="18" x2="21" y2="10" stroke="#FED130" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="39" y1="18" x2="43" y2="10" stroke="#FED130" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="25" x2="54" y2="21" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="39" x2="54" y2="43" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="25" x2="10" y2="21" stroke="#FED130" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="39" x2="10" y2="43" stroke="#FED130" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FerrisWheelGraphic: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 64,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Base Support Frame */}
    <path d="M50 50L30 92H70L50 50Z" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="25" y1="92" x2="75" y2="92" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    {/* Outer Wheel Circles */}
    <circle cx="50" cy="45" r="36" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="45" r="28" stroke="#334155" strokeWidth="1.5" />
    {/* Center Hub */}
    <circle cx="50" cy="45" r="5" fill="#C2272D" stroke="#1E293B" strokeWidth="1.5" />
    {/* Spokes */}
    <line x1="50" y1="9" x2="50" y2="81" stroke="#64748B" strokeWidth="1.5" />
    <line x1="14" y1="45" x2="86" y2="45" stroke="#64748B" strokeWidth="1.5" />
    <line x1="24.5" y1="19.5" x2="75.5" y2="70.5" stroke="#64748B" strokeWidth="1.5" />
    <line x1="75.5" y1="19.5" x2="24.5" y2="70.5" stroke="#64748B" strokeWidth="1.5" />
    {/* Gondolas (Cabins) */}
    {/* Top: Red */}
    <g transform="translate(50, 9)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#C2272D" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Top-Right: Lime Green */}
    <g transform="translate(75.5, 19.5)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#10B981" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Right: Purple */}
    <g transform="translate(86, 45)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Bottom-Right: Amber */}
    <g transform="translate(75.5, 70.5)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Bottom: Cyan */}
    <g transform="translate(50, 81)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#06B6D4" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Bottom-Left: Rose */}
    <g transform="translate(24.5, 70.5)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#EC4899" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Left: Yellow */}
    <g transform="translate(14, 45)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#EAB308" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
    {/* Top-Left: Blue */}
    <g transform="translate(24.5, 19.5)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="#334155" strokeWidth="1.5" />
      <rect x="-5" y="3" width="10" height="7" rx="1.5" fill="#3B82F6" stroke="#1E293B" strokeWidth="1" />
      <rect x="-3" y="4.5" width="6" height="2.5" fill="#F8FAFC" />
    </g>
  </svg>
);

export const CarouselHorseGraphic: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Carousel Pole */}
    <line x1="32" y1="2" x2="32" y2="62" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
    {/* Carousel Horse Body */}
    <path
      d="M20 28C20 25 24 20 30 20C32 17 34 14 38 14C41 14 43 16 43 18C47 20 48 24 45 27L42 28L40 34H26C23 34 20 31 20 28Z"
      fill="#EAA428"
      stroke="#78350F"
      strokeWidth="1.5"
    />
    {/* Horse Mane & Ears */}
    <path d="M37 13L39 16L36 17L38 20L34 21" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
    {/* Saddle */}
    <path d="M28 28C28 28 32 31 36 28V33C36 33 32 35 28 33V28Z" fill="#C2272D" stroke="#78350F" strokeWidth="1" />
    <rect x="30" y="29" width="4" height="3" fill="#FED130" />
    {/* Legs */}
    {/* Front Legs */}
    <path d="M40 34L44 44L41 45L37 36" fill="#EAA428" stroke="#78350F" strokeWidth="1" />
    <rect x="41" y="44" width="3" height="3" fill="#451A03" />
    <path d="M36 34L40 42L37 43L34 35" fill="#D97706" stroke="#78350F" strokeWidth="1" />
    {/* Back Legs */}
    <path d="M25 34L20 44L23 45L28 36" fill="#EAA428" stroke="#78350F" strokeWidth="1" />
    <rect x="20" y="44" width="3" height="3" fill="#451A03" />
    <path d="M22 34L17 42L20 43L24 35" fill="#D97706" stroke="#78350F" strokeWidth="1" />
    {/* Tail */}
    <path d="M20 28C17 29 15 34 16 38" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const BalloonStallGraphic: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Wooden Stall Board */}
    <rect x="8" y="14" width="48" height="42" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="2" />
    <rect x="11" y="17" width="42" height="36" rx="2" fill="#B45309" />
    {/* Lightbulb Frame Dots */}
    <circle cx="14" cy="18" r="1.5" fill="#FEF08A" />
    <circle cx="26" cy="18" r="1.5" fill="#FEF08A" />
    <circle cx="38" cy="18" r="1.5" fill="#FEF08A" />
    <circle cx="50" cy="18" r="1.5" fill="#FEF08A" />
    <circle cx="14" cy="50" r="1.5" fill="#FEF08A" />
    <circle cx="26" cy="50" r="1.5" fill="#FEF08A" />
    <circle cx="38" cy="50" r="1.5" fill="#FEF08A" />
    <circle cx="50" cy="50" r="1.5" fill="#FEF08A" />
    {/* Top Row Balloons */}
    <ellipse cx="19" cy="27" rx="4" ry="5.5" fill="#C2272D" stroke="#7F1D1D" strokeWidth="1" />
    <ellipse cx="28" cy="27" rx="4" ry="5.5" fill="#8B5CF6" stroke="#581C87" strokeWidth="1" />
    <ellipse cx="36" cy="27" rx="4" ry="5.5" fill="#EC4899" stroke="#831843" strokeWidth="1" />
    <ellipse cx="45" cy="27" rx="4" ry="5.5" fill="#10B981" stroke="#064E3B" strokeWidth="1" />
    {/* Bottom Row Balloons */}
    <ellipse cx="19" cy="40" rx="4" ry="5.5" fill="#06B6D4" stroke="#164E63" strokeWidth="1" />
    <ellipse cx="28" cy="40" rx="4" ry="5.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
    <ellipse cx="36" cy="40" rx="4" ry="5.5" fill="#E11D48" stroke="#881337" strokeWidth="1" />
    <ellipse cx="45" cy="40" rx="4" ry="5.5" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1" />
    {/* Roof Canopy / Awning */}
    <path
      d="M6 14L32 6L58 14H6Z"
      fill="#F59E0B"
      stroke="#78350F"
      strokeWidth="1.5"
    />
    <path d="M16 14L32 6L24 14H16Z" fill="#C2272D" />
    <path d="M40 14L32 6L48 14H40Z" fill="#C2272D" />
  </svg>
);

export const StripedTentGraphic: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tent Flag */}
    <line x1="32" y1="6" x2="32" y2="14" stroke="#78350F" strokeWidth="2" />
    <path d="M32 6L40 9L32 12V6Z" fill="#F59E0B" />
    {/* Tent Conical Roof with Alternating Stripes */}
    <path d="M32 14L10 34H54L32 14Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
    {/* Red Stripes */}
    <path d="M32 14L20 34H28L32 14Z" fill="#C2272D" />
    <path d="M32 14L44 34H36L32 14Z" fill="#C2272D" />
    {/* Scalloped Valence / Trim */}
    <path
      d="M10 34Q13 38 16 34Q19 38 22 34Q25 38 28 34Q31 38 34 34Q37 38 40 34Q43 38 46 34Q49 38 52 34H54V38H10V34Z"
      fill="#FED130"
      stroke="#78350F"
      strokeWidth="1"
    />
    {/* Tent Body */}
    <rect x="12" y="38" width="40" height="20" fill="#C2272D" stroke="#78350F" strokeWidth="1.5" />
    {/* Tent Door / Entrance */}
    <path d="M24 58L32 44L40 58H24Z" fill="#78350F" />
  </svg>
);

/**
 * Classic Vintage Scroll Ribbon Banner (แบบป้ายริบบิ้นม้วนกระดาษโบราณในรูปภาพ)
 */
export const VintageScrollBanner: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
}> = ({ title, subtitle, badge }) => (
  <div className="relative mx-auto max-w-2xl px-6 py-4 my-2 text-center select-none">
    {/* Left Ribbon Tail */}
    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 hidden sm:block">
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 5L10 15L25 30L10 45L40 55V5Z" fill="#E8D196" stroke="#8C6838" strokeWidth="2" />
        <path d="M40 10L35 30L40 50V10Z" fill="#C5A463" />
      </svg>
    </div>

    {/* Main Parchment Body */}
    <div className="relative z-10 px-6 sm:px-12 py-5 bg-gradient-to-b from-[#FFF7DB] via-[#FDF1CB] to-[#EED697] border-2 border-[#8C6838] rounded-2xl shadow-[0_6px_16px_rgba(140,104,56,0.18)]">
      {/* Decorative Corner Ornaments */}
      <span className="absolute top-2 left-3 text-[#A88043] text-xs">✦</span>
      <span className="absolute top-2 right-3 text-[#A88043] text-xs">✦</span>
      <span className="absolute bottom-2 left-3 text-[#A88043] text-xs">✦</span>
      <span className="absolute bottom-2 right-3 text-[#A88043] text-xs">✦</span>

      {badge && (
        <div className="inline-block px-3 py-0.5 mb-2 bg-[#A32924] text-[#FFF9E6] text-xs font-bold rounded-full shadow-sm">
          {badge}
        </div>
      )}

      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#381F0D] tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[#5C3B1F] font-semibold">
          {subtitle}
        </p>
      )}
    </div>

    {/* Right Ribbon Tail */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 hidden sm:block">
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5L30 15L15 30L30 45L0 55V5Z" fill="#E8D196" stroke="#8C6838" strokeWidth="2" />
        <path d="M0 10L5 30L0 50V10Z" fill="#C5A463" />
      </svg>
    </div>
  </div>
);

/**
 * Carnival Striped Scalloped Awning Header for Cards / Stalls
 */
export const StallAwningHeader: React.FC<{
  title: string;
  theme: 'green' | 'amber' | 'red';
}> = ({ title, theme }) => {
  const colors = {
    green: {
      bgPrimary: 'bg-[#10B981]',
      bgSecondary: 'bg-[#F59E0B]',
      border: 'border-[#065F46]',
      text: 'text-white',
    },
    amber: {
      bgPrimary: 'bg-[#F59E0B]',
      bgSecondary: 'bg-[#E11D48]',
      border: 'border-[#B45309]',
      text: 'text-white',
    },
    red: {
      bgPrimary: 'bg-[#C2272D]',
      bgSecondary: 'bg-[#F59E0B]',
      border: 'border-[#7F1D1D]',
      text: 'text-white',
    },
  }[theme];

  return (
    <div className="relative -mt-6 -mx-6 mb-5 overflow-hidden rounded-t-2xl border-b-2 border-slate-200">
      {/* Striped Canopy Pattern */}
      <div
        className="h-7 w-full flex"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            ${theme === 'green' ? '#10b981' : theme === 'amber' ? '#f59e0b' : '#c2272d'},
            ${theme === 'green' ? '#10b981' : theme === 'amber' ? '#f59e0b' : '#c2272d'} 16px,
            ${theme === 'green' ? '#fef3c7' : theme === 'amber' ? '#fee2e2' : '#fef3c7'} 16px,
            ${theme === 'green' ? '#fef3c7' : theme === 'amber' ? '#fee2e2' : '#fef3c7'} 32px
          )`,
        }}
      />
      {/* Scalloped bottom edge */}
      <div className="h-2 w-full bg-[#FED130] border-t border-[#B45309]" />
    </div>
  );
};
