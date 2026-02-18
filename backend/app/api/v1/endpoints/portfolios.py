from fastapi import APIRouter

router = APIRouter()

@router.get("/{profile_id}")
async def get_portfolio(profile_id: str):
    return [{"ticker": "AAPL", "shares": 1000, "weight": 5.2}]

@router.get("/{profile_id}/history")
async def get_portfolio_history(profile_id: str):
    return [{"date": "2025-12-31", "holdings": 45}]
