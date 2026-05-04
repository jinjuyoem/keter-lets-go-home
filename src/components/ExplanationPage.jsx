import React from 'react';
import { Database, TrendingUp, CheckCircle, Info, Zap } from 'lucide-react';

export default function ExplanationPage() {
  return (
    <div className="explanation-view" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <header style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 850, marginBottom: 12, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          데이터 추정 방식 안내
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, fontWeight: 500 }}>
          Keter, Let's Go Home이 데이터를 분석하고 산출하는 원리를 안내합니다.
        </p>
      </header>

      {/* ── 메인 요약 배너 ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '24px 32px',
        background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(74,222,128,0.08) 100%)',
        borderRadius: 20,
        border: '1px solid rgba(56,189,248,0.2)',
        marginBottom: 48
      }}>
        <Zap size={24} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.6 }}>
          네이버 검색광고 키워드 도구 기반 <span style={{ color: '#4ade80' }}>절대 수치</span>와 
          데이터랩의 <span style={{ color: 'var(--accent-primary)' }}>상대 지수</span>를 
          조합하여 역산한 추정치입니다.
        </p>
      </div>

      {/* ── 핵심 안내 리스트 ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60 }}>
        <div style={{ display: 'flex', gap: 16, padding: '24px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
          <Info size={20} color="#fb923c" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 800 }}>추정치임을 반드시 인지하세요</h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              본 대시보드의 모든 수치는 실제 측정값이 아닌 수학적 역산에 의한 <strong>추정치</strong>입니다. 
              네이버의 데이터 수집 기준에 따라 실제 수치와는 오차가 발생할 수 있습니다.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, padding: '24px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
          <Database size={20} color="#38bdf8" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 800 }}>데이터 갱신 주기 및 시점</h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              데이터랩 API 구조상 <strong>당일 실적은 제공되지 않으며</strong>, 항상 전일(Yesterday)까지의 데이터를 기준으로 합니다. 
              자정 이후 재방문 시 자동으로 최신 데이터를 요청합니다.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, padding: '24px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
          <TrendingUp size={20} color="#a78bfa" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 800 }}>트렌드 분석에 최적화</h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              절대 수치의 정밀도는 제한적일 수 있으나, 키워드 간의 <strong>상대적 비교</strong>와 
              시간에 따른 <strong>트렌드 방향성</strong>을 확인하는 지표로는 충분히 활용 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {/* ── 데이터 출처 ── */}
      <div style={{
        padding: '24px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 16,
        border: '1px dashed var(--border-color)'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} color="#4ade80" /> 데이터 출처
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>• 네이버 데이터랩 검색어트렌드 (OpenAPI)</span>
            <span style={{ opacity: 0.6 }}>상대 지수 제공</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>• 네이버 검색광고 키워드 도구 (SearchAd API)</span>
            <span style={{ opacity: 0.6 }}>절대 검색량 제공</span>
          </div>
        </div>
      </div>
    </div>
  );
}
