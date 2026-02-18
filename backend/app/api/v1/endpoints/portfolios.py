from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class PortfolioItem(BaseModel):
    ticker: str
    company_name: str
    shares: int
    market_value: float
    portfolio_weight: float
    change_type: str
    last_updated: datetime

# 임시 데이터 (Portfolio Mock Data)
MOCK_PORTFOLIOS = {
    "nancy-pelosi": [
        {"ticker": "NVDA", "company_name": "NVIDIA Corp", "shares": 20000, "market_value": 2400000.0, "portfolio_weight": 20.0, "change_type": "BUY", "last_updated": "2026-02-18T14:30:00Z"},
        {"ticker": "AAPL", "company_name": "Apple Inc", "shares": 50000, "market_value": 9000000.0, "portfolio_weight": 75.0, "change_type": "HOLD", "last_updated": "2026-02-10T10:00:00Z"}
    ],
    "warren-buffett": [
        {"ticker": "AAPL", "company_name": "Apple Inc", "shares": 915000000, "market_value": 164700000000.0, "portfolio_weight": 42.0, "change_type": "HOLD", "last_updated": "2026-02-15T09:00:00Z"},
        {"ticker": "BAC", "company_name": "Bank of America", "shares": 1030000000, "market_value": 34000000000.0, "portfolio_weight": 11.0, "change_type": "SELL", "last_updated": "2026-02-15T09:00:00Z"}
    ]
}

@router.get("/{profile_id}", response_model=List[PortfolioItem])
async def get_portfolio(profile_id: str):
    portfolio = MOCK_PORTFOLIOS.get(profile_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found for this profile")
    return portfolio
