import React from 'react';
import { TrendingUp, Hash, BookOpen, Target, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: TrendingUp,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    title: '빠른 증감 추이 분석',
    desc: '일간·주간·월간 등 다양한 기간별 증감 추이를<br />손쉽게 분석할 수 있습니다.',
  },
  {
    icon: Hash,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    title: '절대 검색량 산출',
    desc: '데이터랩의 상대 지수를 실제 검색량 기반의<br />절대 수치로 환산하여 더욱 정밀하게 제공합니다.',
  },
  {
    icon: BookOpen,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    title: '커스텀 대시보드 생성',
    desc: '매일 확인하는 다양한 쿼리를 나만의 대시보드로 저장하여<br />언제 어디서든 빠르게 확인하세요.',
  },
  {
    icon: Target,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    title: '검색어 간 비교',
    desc: '기준 검색어와 비교 검색어의 쿼리 수치를<br />복잡한 계산 없이 즉시 비교합니다.',
  },
];

export default function WelcomePage({ onStart }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '90vh', padding: '80px 24px',
      animation: 'fadeIn 0.5s ease-out'
    }}>

      {/* Logo Image */}
      <div style={{
        width: 80, height: 80, borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)', marginBottom: 28,
        border: '1px solid var(--border-color)', background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <img src="/logo.png" alt="House Logo" style={{ width: '130%', height: '130%', objectFit: 'contain' }} />
      </div>

      <h1 style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        marginBottom: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em'
      }}>
        <span style={{ fontWeight: 300, fontSize: 28, opacity: 0.9 }}>Keter, Let's Go Home</span>
        <span style={{
          background: 'var(--accent-primary)',
          color: 'var(--bg-dark)',
          padding: '4px 14px',
          borderRadius: 8,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.05em',
          boxShadow: '0 4px 12px rgba(56, 189, 248, 0.2)'
        }}>
          QUERY
        </span>
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.7, marginBottom: 52, textAlign: 'center' }}>
        네이버 데이터랩 + 검색광고 API를 결합한&nbsp;
        <strong style={{ color: 'var(--accent-primary)' }}>검색 트렌드 절대 수치 분석 솔루션</strong>입니다.
        <br />
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', opacity: 0.6, display: 'block', marginTop: 12 }}>
          ※ 네이버 API 일일 호출 한도 초과 시 서비스 이용이 일시적으로 제한될 수 있습니다.
        </span>
      </p>

      {/* Feature Cards - Fixed 2x2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20, maxWidth: 900, width: '100%', marginBottom: 52
      }}>
        {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
          <div
            key={title}
            className="glass-card"
            style={{
              padding: '28px 24px',
              background: 'var(--bg-card)',
              display: 'flex', flexDirection: 'column', gap: 14,
              borderRadius: 16, border: '1px solid var(--border-color)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.4 }}>{title}</h3>
            </div>
            <p
              style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, paddingLeft: 56, wordBreak: 'keep-all' }}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '16px 40px', borderRadius: 14,
          background: 'var(--text-primary)', color: 'var(--bg-dark)',
          fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          letterSpacing: '-0.02em',
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      >
        대시보드 시작하기 <ArrowRight size={18} />
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
