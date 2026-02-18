from fastapi import APIRouter

router = APIRouter()

@router.get("/trending-stocks")
async def get_trending_stocks():
    return [{"ticker": "NVDA", "mentions": 15}]
