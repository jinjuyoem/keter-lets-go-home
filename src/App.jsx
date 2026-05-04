import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, Activity, BarChart2, HelpCircle, Plus, Trash2, Edit3, Check, X, Lock, Layers,
  Search, Star, Zap, Globe, PieChart, Briefcase, ShoppingBag, Tag, Award, Flame, Target, Package,
  Monitor, Smartphone, Car, Coffee, Book, Home, Camera, Music, Film, Utensils, Plane, Heart, Smile, Cpu
} from 'lucide-react';
import TrendDashboard from './components/TrendDashboard';
import ExplanationPage from './components/ExplanationPage';
import WelcomePage from './components/WelcomePage';
import AboutPage from './components/AboutPage';
import './App.css';

// ── Keter, Let's Go Home Logo (Image) ─────────────────────
const InQueryLogo = () => (
  <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
    <img src="/logo.png" alt="Logo" style={{ width: '130%', height: '130%', objectFit: 'contain' }} />
  </div>
);

// ── 선택 가능한 아이콘 팔레트 ────────────────────────────────
const AVAILABLE_ICONS = [
  // 데이터/비즈니스
  { name: 'BarChart2', Comp: BarChart2, label: '차트' },
  { name: 'Activity', Comp: Activity, label: '액티비티' },
  { name: 'TrendingUp', Comp: TrendingUp, label: '트렌드' },
  { name: 'PieChart', Comp: PieChart, label: '파이차트' },
  { name: 'Briefcase', Comp: Briefcase, label: '비즈니스' },
  { name: 'Target', Comp: Target, label: '타겟' },
  { name: 'Globe', Comp: Globe, label: '글로벌' },
  { name: 'Search', Comp: Search, label: '검색' },
  { name: 'Layers', Comp: Layers, label: '레이어' },
  { name: 'Zap', Comp: Zap, label: '스피드' },
  // 산업/제품
  { name: 'ShoppingBag', Comp: ShoppingBag, label: '실범' },
  { name: 'Package', Comp: Package, label: '패키지' },
  { name: 'Tag', Comp: Tag, label: '태그' },
  { name: 'Monitor', Comp: Monitor, label: 'IT/모니터' },
  { name: 'Smartphone', Comp: Smartphone, label: '스마트폰' },
  { name: 'Cpu', Comp: Cpu, label: '로보틱' },
  { name: 'Car', Comp: Car, label: '자동차' },
  { name: 'Camera', Comp: Camera, label: '카메라' },
  // 라이프스타일/서비스
  { name: 'Coffee', Comp: Coffee, label: '카페' },
  { name: 'Utensils', Comp: Utensils, label: '식품' },
  { name: 'Book', Comp: Book, label: '서적' },
  { name: 'Music', Comp: Music, label: '음악' },
  { name: 'Film', Comp: Film, label: '영화/콘텐츠' },
  { name: 'Plane', Comp: Plane, label: '여행' },
  { name: 'Home', Comp: Home, label: '홈/리빙' },
  { name: 'Heart', Comp: Heart, label: '헬스/빀우티' },
  { name: 'Smile', Comp: Smile, label: '비영리' },
  { name: 'Award', Comp: Award, label: '수상' },
  { name: 'Flame', Comp: Flame, label: '트렌딩' },
  { name: 'Star', Comp: Star, label: '스타' },
];

function getIconComp(iconName) {
  return AVAILABLE_ICONS.find(i => i.name === iconName)?.Comp || Layers;
}

// ── 기본 그룹 데이터 ─────────────────────────────────────────
const BRAND_GROUPS = []; // 빈 상태로 시작하여 사용자가 입력하도록 함
const RUNNING_GROUPS = [];

const DEFAULT_GROUPS_MAP = {
  brand: BRAND_GROUPS,
  running: RUNNING_GROUPS,
};

// ── 기본 대시보드 정의 ────────────────────────────────────────
const DEFAULT_DASHBOARDS = [
  { id: 'brand', name: 'Brand Query Trend', locked: true, storageKey: 'inquery_brand_custom_groups', groupLabel: '브랜드명', icon: 'BarChart2' },
];

const DASHBOARDS_STORAGE_KEY = 'inquery_dashboards_list_v1';

function loadDashboards() {
  try {
    const saved = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // 구버전에 'category' 대시보드가 있으면 제거
        return parsed.filter(d => d.id !== 'category');
      }
    }
  } catch (e) { }
  return DEFAULT_DASHBOARDS;
}

function saveDashboards(list) {
  try { localStorage.setItem(DASHBOARDS_STORAGE_KEY, JSON.stringify(list)); }
  catch (e) { }
}

export default function App() {
  const [dashboards, setDashboards] = useState(loadDashboards);
  const [activeService, setActiveService] = useState(() => !localStorage.getItem(DASHBOARDS_STORAGE_KEY) ? 'about' : 'query');
  const [activeTab, setActiveTab] = useState(() => !localStorage.getItem(DASHBOARDS_STORAGE_KEY) ? 'welcome' : (loadDashboards()[0]?.id || 'brand'));
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [iconPickerForId, setIconPickerForId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const editInputRef = useRef(null);
  const iconPickerRef = useRef(null);

  useEffect(() => { saveDashboards(dashboards); }, [dashboards]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // 아이콘 피커 외부 클릭 시 닫기
  useEffect(() => {
    if (!iconPickerForId) return;
    const handleClickOutside = (e) => {
      if (iconPickerRef.current && !iconPickerRef.current.contains(e.target)) {
        setIconPickerForId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [iconPickerForId]);

  const startRename = (dash, e) => {
    e?.stopPropagation();
    setEditingId(dash.id);
    setEditingName(dash.name);
  };

  const confirmRename = (id, e) => {
    e?.stopPropagation();
    if (!editingName.trim()) { cancelRename(); return; }
    setDashboards(prev => prev.map(d => d.id === id ? { ...d, name: editingName.trim() } : d));
    setEditingId(null);
  };

  const cancelRename = (e) => {
    e?.stopPropagation();
    setEditingId(null);
    setEditingName('');
  };

  const changeIcon = (dashId, iconName) => {
    setDashboards(prev => prev.map(d => d.id === dashId ? { ...d, icon: iconName } : d));
    setIconPickerForId(null);
  };

  const addDashboard = () => {
    const newId = `dash_${Date.now()}`;
    const newDash = { id: newId, name: '새 대시보드', locked: false, storageKey: `inquery_custom_${newId}`, groupLabel: '주제어', icon: 'Layers' };
    setDashboards(prev => [...prev, newDash]);
    setActiveTab(newId);
    setTimeout(() => { setEditingId(newId); setEditingName('새 대시보드'); }, 80);
  };

  const deleteDashboard = (id, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDeleteConfirmId(id);
  };

  const executeDelete = () => {
    if (!deleteConfirmId) return;
    setDashboards(prev => prev.filter(d => d.id !== deleteConfirmId));
    
    if (activeTab === deleteConfirmId) {
      const updated = dashboards.filter(d => d.id !== deleteConfirmId);
      setActiveTab(updated[0]?.id || 'brand');
    }
    setDeleteConfirmId(null);
  };

  const activeDashboard = dashboards.find(d => d.id === activeTab);

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="top-nav-left">
          <InQueryLogo />
          <div style={{ marginLeft: 12, lineHeight: 1.2 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Keter, Lets Go Home</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Solutions Hub</div>
          </div>
          
          <nav className="top-nav-menu">
            <div 
              className={`top-nav-item ${activeService === 'about' ? 'active' : ''}`}
              onClick={() => setActiveService('about')}
            >
              케터렛고홈이란?
            </div>
            <div 
              className={`top-nav-item ${activeService === 'query' ? 'active' : ''}`}
              onClick={() => setActiveService('query')}
            >
              Query <span className="beta-badge">BETA</span>
            </div>
            <div className="top-nav-item disabled" style={{ fontSize: 13, opacity: 0.5 }}>
              다양한 솔루션 출시 예정
            </div>
          </nav>
        </div>
        
        <div className="top-nav-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>v1.0.0</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)' }} />
        </div>
      </header>

      <div className="dashboard-container">
        {activeService === 'query' ? (
          <>
            <aside className="sidebar">
              <nav className="sidebar-nav">
                <div
                  className={`nav-item ${activeTab === 'welcome' ? 'active' : ''}`}
                  onClick={() => setActiveTab('welcome')}
                  style={{ marginBottom: 12, background: activeTab === 'welcome' ? 'var(--accent-primary)' : 'var(--bg-card-hover)' }}
                >
                  <Layers size={18} />
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Query 솔루션 소개</span>
                </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 8, marginBottom: 8, paddingLeft: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            My Dashboards
          </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {dashboards.map((dash) => {
              const Icon = getIconComp(dash.icon);
              const isActive = activeTab === dash.id;
              const isEditing = editingId === dash.id;

              return (
                <div key={dash.id} style={{ position: 'relative' }}>
                  <div
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => { if (!isEditing) setActiveTab(dash.id); }}
                    style={{ position: 'relative', paddingRight: !dash.locked ? 60 : 16 }}
                  >
                    {/* 아이콘 (비잠금은 클릭으로 피커 열기) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!dash.locked) setIconPickerForId(prev => prev === dash.id ? null : dash.id);
                      }}
                      title={dash.locked ? '' : '아이콘 변경 (클릭)'}
                      style={{ cursor: dash.locked ? 'default' : 'pointer', borderRadius: 6, padding: 2, display: 'flex', transition: 'background 0.15s' }}
                    >
                      <Icon size={18} />
                    </div>

                    {/* 이름 (편집 중이면 인풋) */}
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0 }} onClick={e => e.stopPropagation()}>
                        <input
                          ref={editInputRef}
                          value={editingName}
                          onChange={e => setEditingName(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') confirmRename(dash.id); if (e.key === 'Escape') cancelRename(); }}
                          style={{ flex: 1, minWidth: 0, background: 'var(--glass-border)', border: '1px solid var(--accent-primary)', borderRadius: 6, padding: '3px 8px', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, outline: 'none' }}
                        />
                        <button onClick={(e) => confirmRename(dash.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4ade80', padding: 2, display: 'flex' }}><Check size={13} /></button>
                        <button onClick={cancelRename} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: 2, display: 'flex' }}><X size={13} /></button>
                      </div>
                    ) : (
                      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>{dash.name}</span>
                    )}

                    {dash.locked && !isEditing && (
                      <Lock size={10} style={{ color: isActive ? 'var(--text-secondary)' : 'var(--border-color)', flexShrink: 0 }} />
                    )}

                    {!dash.locked && !isEditing && (
                      <div className="nav-item-actions" onClick={e => e.stopPropagation()}>
                        <button onClick={(e) => startRename(dash, e)} title="이름 변경" className="nav-action-btn" style={{ color: isActive ? 'var(--bg-dark)' : 'var(--text-secondary)' }}>
                          <Edit3 size={11} />
                        </button>
                        <button onClick={(e) => deleteDashboard(dash.id, e)} title="삭제" className="nav-action-btn nav-delete-btn">
                          <Trash2 size={11} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 아이콘 피커 팝업 */}
                  {iconPickerForId === dash.id && (
                    <div
                      ref={iconPickerRef}
                      onClick={e => e.stopPropagation()}
                      style={{
                        position: 'absolute', top: '100%', left: 0, zIndex: 300,
                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                        borderRadius: 12, padding: 12,
                        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)', width: 220, marginTop: 4,
                      }}
                    >
                      <div style={{ gridColumn: '1/-1', fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        아이콘 선택
                      </div>
                      {AVAILABLE_ICONS.map(({ name, Comp }) => (
                        <button
                          key={name}
                          onClick={() => changeIcon(dash.id, name)}
                          style={{
                            padding: 8,
                            background: dash.icon === name ? 'rgba(56,189,248,0.2)' : 'var(--glass-border)',
                            border: `1px solid ${dash.icon === name ? 'var(--accent-primary)' : 'transparent'}`,
                            borderRadius: 8, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: dash.icon === name ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            transition: 'all 0.15s',
                          }}
                        >
                          <Comp size={15} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* + 대시보드 추가 버튼 */}
            <button onClick={addDashboard} className="nav-add-btn">
              <Plus size={14} />
              <span>대시보드 추가</span>
            </button>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
            <div
              className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              <HelpCircle size={18} />
              <span style={{ fontSize: 13 }}>데이터 추정 방식 안내</span>
            </div>
          </div>
        </nav>
      </aside>

      <main className="main-content" style={{ padding: activeTab === 'welcome' ? 0 : 40 }}>
        {activeTab === 'welcome' && <WelcomePage onStart={() => setActiveTab(dashboards[0]?.id || 'brand')} />}
        
        {activeTab !== 'guide' && activeTab !== 'welcome' && activeDashboard && (
          <TrendDashboard
            key={activeDashboard.id}
            title={activeDashboard.name}
            subtitle={activeDashboard.id === 'brand' ? '내 브랜드의 쿼리 트렌드를 경쟁사와 비교합니다.' : ''}
            groups={DEFAULT_GROUPS_MAP[activeDashboard.id] || []}
            colors={{}}
            showKeywords={true}
            editable={true}
            storageKey={activeDashboard.storageKey}
            showSummaryCards={true}
            groupLabel={activeDashboard.groupLabel || '주제어'}
          />
        )}

        {activeTab === 'guide' && <ExplanationPage />}

        <footer style={{ marginTop: 'auto', paddingTop: 40, paddingBottom: 20, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13, borderTop: '1px solid var(--border-color)', width: '100%' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} ujnijmoey. All rights reserved.</p>
          <p style={{ margin: '8px 0 0 0', opacity: 0.7, fontSize: 12 }}>Data Source: NAVER Datalab Search API, Search AD API</p>
        </footer>
      </main>
      </>
    ) : (
      <AboutPage onStart={() => { setActiveService('query'); setActiveTab('welcome'); }} />
    )}

      {deleteConfirmId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDeleteConfirmId(null)}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '24px 32px', width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 800 }}>대시보드 삭제</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{(dashboards.find(d => d.id === deleteConfirmId)?.name || '')}</strong> 대시보드를 정말 삭제하시겠습니까?<br/>삭제된 데이터는 복구할 수 없습니다.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button onClick={() => setDeleteConfirmId(null)} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg-card-hover)', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>취소</button>
              <button onClick={executeDelete} style={{ padding: '8px 16px', borderRadius: 8, background: '#ef4444', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>삭제하기</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
