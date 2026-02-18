from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_latest_transactions():
    return [{"ticker": "TSLA", "type": "BUY", "amount": 5000}]
