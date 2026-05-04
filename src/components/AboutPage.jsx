import React, { useState } from 'react';
import { Zap, Clock, ShieldCheck, Heart, Copy, Check } from 'lucide-react';

export default function AboutPage({ onStart }) {
  const [copied, setCopied] = useState(false);
  const email = "ujnijmoey@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'flex-start', minHeight: '100%', padding: '100px 24px',
      animation: 'fadeIn 0.6s ease-out', textAlign: 'center',
      flex: 1, width: '100%', overflowY: 'auto'
    }}>
      <div style={{
        padding: '12px 20px', background: 'rgba(251, 146, 60, 0.08)',
        borderRadius: 20, color: 'var(--accent-primary)',
        fontSize: 14, fontWeight: 700, marginBottom: 32,
        border: '1px solid rgba(251, 146, 60, 0.15)',
        letterSpacing: '0.05em'
      }}>
        MISSION STATEMENT
      </div>

      <h1 style={{
        fontSize: 48, fontWeight: 900, marginBottom: 28,
        letterSpacing: '-0.04em', color: 'var(--text-primary)',
        lineHeight: 1.2, maxWidth: 800
      }}>
        바쁜 마케터들을 위해<br />
        <span style={{ color: 'var(--accent-primary)' }}>조금이라도 업무 시간을 줄이기 위한</span><br />
        협업 도구입니다.
      </h1>

      <p style={{
        fontSize: 18, color: 'var(--text-secondary)',
        maxWidth: 640, lineHeight: 1.8, marginBottom: 64,
        fontWeight: 500
      }}>
        매일 반복되는 루틴한 업무들은<br />
        이제 Keter, Let's Go Home이 대신하겠습니다.<br />
        여러분의 소중한 퇴근 시간을 지켜드리는 것이 유일한 목표입니다.
        <span style={{ color: '#f8fafc', fontSize: 11, cursor: 'default', userSelect: 'all', display: 'block', marginTop: 16, opacity: 0.8 }}>
          우리 빨리빨리 하고 집에 갑시다, 불쌍한 노예여 ㅠ
        </span>
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 48, maxWidth: 1000, width: '100%', marginBottom: 80
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(56, 189, 248, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Zap size={30} color="#38bdf8" />
          </div>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 20, fontWeight: 800 }}>생산성 혁신</h4>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            단순 반복적인 루틴 업무를 자동화하여<br />누구나 빠르게 결과를 도출합니다.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(74, 222, 128, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Clock size={30} color="#4ade80" />
          </div>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 20, fontWeight: 800 }}>리소스 최적화</h4>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            불필요한 수작업을 획기적으로 줄이고<br />더 가치 있는 기획과 전략에 집중하세요.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(167, 139, 250, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Heart size={30} color="#a78bfa" />
          </div>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 20, fontWeight: 800 }}>행복한 퇴근</h4>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            업무 효율을 극대화하여 마케터들의<br />소중한 저녁 시간을 되찾아 드립니다.
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        style={{
          padding: '18px 48px', borderRadius: 16,
          background: 'var(--text-primary)', color: 'var(--bg-dark)',
          fontSize: 18, fontWeight: 800, border: 'none', cursor: 'pointer',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          transition: 'all 0.2s',
          marginBottom: 100
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        솔루션 체험하기
      </button>

      {/* Flex Spacer to push footer down */}
      <div style={{ flex: 1 }} />

      <div style={{
        maxWidth: 800, width: '100%', padding: '60px 24px 40px',
        borderTop: '1px solid var(--border-color)', opacity: 0.8,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{
          fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16,
          lineHeight: 1.8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '4px 6px'
        }}>
          <span>오류 제보 및 개선 의견:</span>
          <div
            onClick={handleCopy}
            title="클릭하여 이메일 복사"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              cursor: 'pointer', color: copied ? 'var(--accent-primary)' : 'var(--text-primary)',
              background: 'rgba(255,255,255,0.04)', padding: '3px 10px',
              borderRadius: 6, transition: 'all 0.2s', fontWeight: 700,
              border: '1px solid var(--border-color)'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span style={{ fontSize: 13 }}>{email}</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', opacity: 0.5, margin: 0, lineHeight: 1.8, textAlign: 'center', maxWidth: 700 }}>
          ※ 본 사이트에서 제공되는 모든 솔루션의 결과값은 참고용이며, 이를 활용하여 발생하는 결과에 대해 제작자는 어떠한 책임도 지지 않습니다.
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
