# 📊 CelebrityPortfolio Project Plan

**CelebrityPortfolio**는 고위 공직자와 유명 투자자들의 포트폴리오를 실시간으로 추적하고 시각화하는 프리미엄 웹 서비스입니다.

---

## 🏗️ 1. Technical Stack (2026 Trend)

최신 웹 트렌드에 따라 **고성능, 확장성, 데이터 시각화**에 최적화된 스택을 제안합니다.

| 레이어 | 기술 스택 | 선정 이유 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 16 (App Router)** | 서버 사이드 렌더링(SSR)과 정적 재생성(ISR)을 통한 최상의 SEO 및 초기 로딩 속도 |
| **Styling** | **Tailwind CSS + Shadcn UI** | 빠르고 일관된 디자인 시스템 구축 및 테마 커스터마이징 용이성 |
| **Visualization** | **Recharts + Framer Motion** | 직관적인 차트 애니메이션과 금융 데이터 시각화의 정교함 |
| **Backend** | **FastAPI (Python 3.14+)** | 주식 데이터 수집(Crawl) 및 분석에 최적화된 고성능 비동기 프레임워크 |
| **Database** | **Supabase (PostgreSQL)** | 실시간 알림 지원 및 빠른 데이터베이스 인프라 구축 |
| **Data Fetching** | **React Query (TanStack)** | 효율적인 캐싱과 실시간 주가 업데이트 관리 |

---

## 📂 2. Target Individuals (Investment Legends)

추적 대상은 크게 세 그룹으로 분류하여 사용자가 선택할 수 있도록 합니다.

### Group 1: Value & Hedge Fund Legends (거물 투자자)
- **Warren Buffett (Berkshire Hathaway):** 가치 투자의 교과서.
- **Stanley Druckenmiller (Duquesne):** 매크로 투자의 귀재.
- **Bill Ackman (Pershing Square):** 집중 투자의 대가.
- **Li Lu (Himalaya Capital):** 찰리 멍거가 인정한 아시아 투자 전문가.

### Group 2: Growth & Tech Visionaries (혁신 투자자)
- **Peter Thiel (Founder's Fund):** 페이팔 마피아의 수장, 빅테크 인사이트.
- **Cathie Wood (ARK Invest):** 파괴적 혁신 기술 중심 포트폴리오.

### Group 3: High-Profile Politicians (고위 공직자)
- **Nancy Pelosi:** 미 국회의원 중 가장 수익률이 높은 인물 중 하나.
- **Josh Hawley:** 공직자 거래 금지법 논의의 중심에 있는 주요 인물들.

---

## 🌐 3. Data Sources (Research Results)

데이터는 공신력 있는 기관의 공시 자료와 실시간 API를 조합하여 정확성을 높입니다.

1.  **SEC EDGAR (13F Filings):** 기관 투자자들이 매 분기 의무적으로 제출하는 포트폴리오 공시 자료 (원본 데이터).
2.  **WhaleWisdom / OpenFIGI:** 13F 데이터를 정제하여 제공하는 전문 서비스.
3.  **Polygon.io / Alpaca API:** 실시간 주가 및 거래량 데이터 연동.
4.  **Capitol Trades:** 국회의원들의 주식 거래 내역을 실시간으로 추적하는 전문 데이터셋.

---

## 🚀 4. Key Features

- **Portfolio Heatmap:** 인물별 투자 비중을 한눈에 파악.
- **Clone Trade Alert:** 유명 인물의 포트폴리오에 변화가 생겼을 때 실시간 알림.
- **Benchmark Comparison:** S&P 500 대비 이들의 수익률 성과 지표 비교.
- **Insider Deep-dive:** 단순 주식 외에도 옵션 및 파생상품 거래 내역 분석.

---
*Created by Elon Musk (OpenClaw Assistant)* 🚀
