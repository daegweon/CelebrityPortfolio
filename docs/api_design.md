# CelebrityPortfolio API Design v1.0

## 🎨 Base Concept
**CelebrityPortfolio**의 API는 RESTful 구조를 따르며, 모든 응답은 `application/json` 형식으로 제공됩니다. 데이터의 정확성과 실시간 업데이트를 보장하기 위해 비동기 처리가 가능한 FastAPI를 활용하여 설계되었습니다.

---

## 🏗️ 1. API Endpoints Overview

### A. Profiles (Target Individuals)
유명 인사들의 기본 정보 및 추적 대상 리스트를 관리합니다.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/profiles` | 추적 중인 모든 인물(투자자/공직자) 목록 조회 |
| **GET** | `/api/v1/profiles/{id}` | 특정 인물의 상세 프로필 정보 (이력서, 전략 등) 조회 |
| **GET** | `/api/v1/profiles/groups/{group_id}` | 특정 그룹(예: Value Legends, Tech Visionaries) 소속 인물 조회 |

### B. Portfolios (Holdings & Performance)
가장 핵심이 되는 포트폴리오 및 수익률 데이터를 제공합니다.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/portfolios/{profile_id}` | 특정 인물의 현재 주식 보유 현황 (종목, 수량, 비중) |
| **GET** | `/api/v1/portfolios/{profile_id}/history` | 과거 포트폴리오 변동 이력 조회 (분기별 변화) |
| **GET** | `/api/v1/portfolios/{profile_id}/performance` | S&P 500 대비 수익률 비교 및 성과 지표 (Alpha, Beta) |

### C. Transactions (Real-time Trading)
최근 발생한 매수/매도 거래 내역을 실시간으로 추적합니다.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/transactions` | 최신 거래 피드 (전체 인물 대상 최신순) |
| **GET** | `/api/v1/transactions/{profile_id}` | 특정 인물의 최근 거래 내역 조회 |

### D. Insights & Analysis
데이터 분석을 통한 추천 및 트렌드 정보를 제공합니다.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/insights/trending-stocks` | 유명 인사들 사이에서 가장 많이 매수/매도된 인기 종목 |
| **GET** | `/api/v1/insights/sector-distribution` | 전체적인 섹터별 투자 비중 분석 결과 |

---

## 📦 2. Data Schema (Example: Portfolio Item)

```json
{
  "profile_id": "nancy-pelosi",
  "ticker": "NVDA",
  "company_name": "NVIDIA Corp",
  "shares": 10000,
  "market_value": 1200000.00,
  "portfolio_weight": 12.5,
  "last_updated": "2026-02-18T14:30:00Z",
  "change_type": "BUY",
  "change_amount": 2500
}
```

---

## 🚀 3. Core Logic & Background Tasks (Backend Workflow)

1.  **SEC Scraper (Worker):** 매일 1시간 단위로 SEC EDGAR의 13F 공시 및 국회의원 거래 내역(`Capitol Trades` 연동)을 스크래핑하여 DB를 갱신합니다.
2.  **Price Updater (Worker):** 마감 시점의 주가 API(`Polygon.io`)를 호출하여 각 포트폴리오의 실시간 가치를 재계산합니다.
3.  **Real-time Alerts (Webhooks):** 포트폴리오에 유의미한 변화가 감지될 경우, 프론트엔드에 실시간 푸시 알림을 발송합니다.

---
*Created by Elon Musk (OpenClaw Assistant)* 🚀
