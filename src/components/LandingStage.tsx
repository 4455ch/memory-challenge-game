'use client';

import React, { useState } from 'react';
import { Difficulty } from '@/types/game';
import { Play, Clock, HelpCircle, Check, Sparkles, Eye, Target, Trophy, ChevronRight, Compass } from 'lucide-react';
import {
  FireworkBurst,
  FerrisWheelGraphic,
  CarouselHorseGraphic,
  BalloonStallGraphic,
  StripedTentGraphic,
  VintageScrollBanner,
  StallAwningHeader,
} from './TempleFairGraphics';

interface LandingStageProps {
  onStartGame: (difficulty: Difficulty, playerName: string) => void;
  isLoading?: boolean;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  {
    title: string;
    subtitle: string;
    stallName: string;
    stars: string;
    theme: 'green' | 'amber' | 'red';
    Graphic: React.FC<{ size?: number; className?: string }>;
    description: string;
    rules: string[];
  }
> = {
  Easy: {
    title: 'ง่าย (EASY)',
    subtitle: 'ด่าน 1: ซุ้มปาลูกโป่งมือใหม่',
    stallName: 'ซุ้มปาลูกโป่ง 🎯',
    stars: '★☆☆',
    theme: 'green',
    Graphic: BalloonStallGraphic,
    description: 'ภาพฉากสบายตา มองเห็นสิ่งของชัดเจน คำถามตรงไปตรงมา เหมาะสำหรับผู้เริ่มต้น',
    rules: ['เห็นสิ่งของและสีหลักชัดเจน', 'ท่าทางภารกิจง่าย ไม่ซับซ้อน', 'มีเวลาจดจำภาพเต็ม 60 วินาที'],
  },
  Medium: {
    title: 'ปานกลาง (MEDIUM)',
    subtitle: 'ด่าน 2: ซุ้มม้าหมุนช่างสังเกต',
    stallName: 'ซุ้มม้าหมุน 🎠',
    stars: '★★☆',
    theme: 'amber',
    Graphic: CarouselHorseGraphic,
    description: 'ภาพฉากที่มีรายละเอียดมากขึ้น วัตถุจัดวางอย่างประณีต ต้องใช้สายตาช่างสังเกต',
    rules: ['สังเกตตำแหน่งและวัสดุของสิ่งของ', 'คำถามมีลูกเล่นและจับเวลาท้าทาย', 'ต้องสังเกตรายละเอียดให้รอบคอบ'],
  },
  Hard: {
    title: 'ยาก (HARD)',
    subtitle: 'ด่าน 3: ซุ้มชิงช้าสวรรค์ยอดฝีมือ',
    stallName: 'ซุ้มชิงช้าสวรรค์ 🎡',
    stars: '★★★',
    theme: 'red',
    Graphic: FerrisWheelGraphic,
    description: 'ภาพฉากซับซ้อน มีเส้นสาย ลวดลาย แสงสะท้อน และรายละเอียดหนาแน่น ท้าทายสายตาขั้นสุด',
    rules: ['รายละเอียดภาพหนาแน่นและซับซ้อน', 'ภารกิจ Staff ทดสอบปฏิกิริยา', 'ความท้าทายสูงสุดสำหรับยอดฝีมือ'],
  },
};

const JOURNEY_STEPS = [
  {
    step: '01',
    badge: 'ก้าวแรก',
    title: 'ส่องจำภาพ 60 วินาที',
    description: 'จดจำรายละเอียด วัตถุ และสีสันในภาพ ก่อนที่ภาพจะถูกซ่อนตัวอย่างสมบูรณ์',
    icon: Eye,
    iconBg: 'bg-[#10B981] text-white',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ringColor: 'ring-emerald-200',
  },
  {
    step: '02',
    badge: 'ซุ้มประลอง',
    title: 'คำถาม 5 ข้อ & Staff',
    description: 'ท้าทายสายตา 5 ข้อ สุ่มทั้งคำถามสังเกตและภารกิจปฏิบัติจริงจาก Staff',
    icon: Target,
    iconBg: 'bg-[#2563EB] text-white',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    ringColor: 'ring-blue-200',
  },
  {
    step: '03',
    badge: 'แข่งกับเวลา',
    title: 'เวลาตอบ 30 วินาที',
    description: 'มีเวลาตัดสินใจข้อละ 30 วินาที หากตอบไม่ทันจะได้ 0 คะแนนในข้อนั้นทันที',
    icon: Clock,
    iconBg: 'bg-[#C2272D] text-white',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    ringColor: 'ring-rose-200',
  },
  {
    step: '04',
    badge: 'เส้นชัยปลายทาง',
    title: 'แลกของรางวัล',
    description: 'นำรหัสคูปองไปแลกของรางวัลที่ซุ้มงานวัดได้ทันที',
    icon: Trophy,
    iconBg: 'bg-[#F59E0B] text-[#381F0D]',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    ringColor: 'ring-amber-200',
  },
];

export const LandingStage: React.FC<LandingStageProps> = ({
  onStartGame,
  isLoading = false,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [playerName, setPlayerName] = useState<string>('Player 1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(selectedDifficulty, playerName.trim() || 'Player 1');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 relative">
      {/* Decorative Firework Bursts in Corners (Like in Reference Poster) */}
      <div className="absolute top-2 left-2 sm:left-6 opacity-80 pointer-events-none">
        <FireworkBurst size={56} />
      </div>
      <div className="absolute top-4 right-2 sm:right-6 opacity-80 pointer-events-none">
        <FireworkBurst size={64} />
      </div>

      {/* Vintage Scroll Banner (แบบป้ายริบบิ้นกระดาษม้วนโบราณในรูปภาพ) */}
      <div className="mb-8">
        <VintageScrollBanner
          badge="เทศกาลเที่ยวงานวัด"
          title="เกม จำให้ MAN"
          subtitle="ประลองความจำ & ภารกิจท้าทาย • จำภาพ 60 วินาที • ตอบคำถามข้อละ 30 วินาที"
        />
        <p className="text-center text-sm sm:text-base text-slate-700 max-w-xl mx-auto mt-2 font-medium">
          สังเกตภาพให้ละเอียดภายใน 60 วินาที ก่อนที่ภาพจะถูกซ่อน จากนั้นตอบคำถามและทำภารกิจ Staff ให้ครบ 5 ข้อเพื่อคว้าอันดับรางวัล!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Player Ticket / Name Input */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-bold text-[#5C3B1F] mb-2 text-center">
            🎟️ ระบุชื่อผู้ร่วมสนุก / ฉายาของคุณ
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="ระบุชื่อผู้เล่น..."
            maxLength={24}
            className="w-full px-5 py-3.5 bg-white border-2 border-[#D4C5AB] focus:border-[#C2272D] focus:ring-4 focus:ring-amber-100 rounded-xl text-slate-900 text-base sm:text-lg font-semibold text-center shadow-sm placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* 3 Temple Fair Stalls (Difficulty Selection Cards) */}
        <div>
          <div className="text-center mb-4">
            <span className="text-sm font-extrabold text-[#7A4B17] uppercase tracking-wider bg-[#FFF2D1] px-4 py-1.5 rounded-full border border-[#E3C37B] shadow-sm">
              [ เลือกระดับความยาก ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => {
              const cfg = DIFFICULTY_CONFIG[diff];
              const Graphic = cfg.Graphic;
              const isSelected = selectedDifficulty === diff;

              return (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`relative p-6 text-left rounded-2xl border-2 transition-all duration-150 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'border-[#C2272D] bg-[#FFFBF0] shadow-lg ring-2 ring-[#F59E0B] -translate-y-1'
                      : 'border-[#E0D5C1] bg-white hover:border-[#D4C5AB] hover:shadow-md'
                  }`}
                >
                  {/* Striped Carnival Scalloped Awning on top of each card */}
                  <StallAwningHeader title={cfg.stallName} theme={cfg.theme} />

                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="absolute top-8 right-4 bg-[#C2272D] text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> เลือกแล้ว
                    </div>
                  )}

                  <div>
                    {/* Attraction Stall Icon & Title */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-14 h-14 bg-[#FAF7F0] border border-[#E8DEC8] rounded-xl flex items-center justify-center shrink-0 p-1 shadow-sm">
                        <Graphic size={48} />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-[#381F0D]">{cfg.title}</h3>
                        <p className="text-xs sm:text-sm font-bold text-[#8C5E28]">
                          {cfg.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-base text-amber-500 mb-2 tracking-widest font-bold">
                      {cfg.stars}
                    </div>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed font-normal">
                      {cfg.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-[#EFE8D8]">
                    {cfg.rules.map((rule, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-center gap-2 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#C2272D] shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Journey Roadmap (เส้นทางของการเล่น 4 ขั้นตอน ไม่ใช้แบบการ์ด) */}
        <div className="bg-white/95 rounded-3xl border border-[#DCCEB5] p-6 sm:p-8 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
          {/* Journey Header */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-8 pb-4 border-b border-[#EFE8D8]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2D1] border border-[#E3C37B] flex items-center justify-center text-[#7A4B17] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#381F0D]">
                  เส้นทางการผจญภัยในซุ้มงานวัด
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  ก้าวสู่ชัยชนะและคว้ารางวัลใหญ่ใน 4 ขั้นตอน
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7A4B17] bg-[#FAF7F0] px-3.5 py-1 rounded-full border border-[#E0D5C1]">
              🚩 แผนที่เส้นทางการเล่น (Journey Map)
            </span>
          </div>

          {/* Desktop Horizontal Journey Path (md and above) */}
          <div className="hidden md:block relative">
            {/* Connecting Dashed Trail Line */}
            <div className="absolute top-7 left-12 right-12 h-0.5 border-t-2 border-dashed border-[#D4C5AB] z-0" />

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {JOURNEY_STEPS.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === JOURNEY_STEPS.length - 1;

                return (
                  <div key={item.step} className="flex flex-col items-center text-center relative group">
                    {/* Step Node */}
                    <div className="relative mb-3.5">
                      <div
                        className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md ring-4 ${item.ringColor} transition-transform group-hover:scale-105`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="absolute -bottom-2 bg-[#381F0D] text-[#FFF9E6] text-[10px] font-black px-2 py-0.5 rounded-full border border-white">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Tag */}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-1.5 ${item.badgeBg}`}
                    >
                      {item.badge}
                    </span>

                    {/* Step Title */}
                    <h5 className="text-base font-extrabold text-[#381F0D] mb-1 leading-snug">
                      {item.title}
                    </h5>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Direction Arrow Between Nodes */}
                    {!isLast && (
                      <div className="absolute top-5 -right-3 text-[#B49463] z-20 pointer-events-none">
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Journey Path (below md) */}
          <div className="md:hidden relative pl-2">
            {/* Vertical Connecting Trail Line */}
            <div className="absolute top-6 bottom-8 left-7 w-0.5 border-l-2 border-dashed border-[#D4C5AB] z-0" />

            <div className="space-y-6 relative z-10">
              {JOURNEY_STEPS.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.step} className="flex items-start gap-4 relative">
                    {/* Node on left */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shadow-sm ring-4 ${item.ringColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="absolute -bottom-1.5 -right-1.5 bg-[#381F0D] text-[#FFF9E6] text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white">
                        {item.step}
                      </span>
                    </div>

                    {/* Content on right */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}
                        >
                          {item.badge}
                        </span>
                        <h5 className="text-sm sm:text-base font-extrabold text-[#381F0D]">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Start Game Action Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#F59E0B] hover:from-[#D97706] hover:to-[#D97706] text-[#381F0D] font-black text-base sm:text-lg rounded-xl shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] border border-[#B45309] transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-[#381F0D] border-t-transparent rounded-full animate-spin" />
                กำลังเปิดซุ้มเกม...
              </span>
            ) : (
              <>
                <Play className="w-5 h-5 fill-[#381F0D] text-[#381F0D]" />
                เริ่มภารกิจความจำ "จำให้ MAN" [{DIFFICULTY_CONFIG[selectedDifficulty].title}]
              </>
            )}
          </button>
        </div>

        {/* Festive Temple Fair Carnival Skyline Footer Accent (Inspired directly by the poster illustration) */}
        <div className="pt-6 pb-2 flex items-end justify-center gap-4 sm:gap-8 opacity-75 select-none pointer-events-none">
          <BalloonStallGraphic size={44} />
          <CarouselHorseGraphic size={48} />
          <FerrisWheelGraphic size={68} />
          <StripedTentGraphic size={52} />
        </div>
      </form>
    </div>
  );
};
