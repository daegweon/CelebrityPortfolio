from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class Transaction(BaseModel):
    id: str
    profile_name: str
    profile_id: str
    ticker: str
    type: str # BUY, SELL
    amount: str
    price: float
    timestamp: datetime

MOCK_TRANSACTIONS = [
    {
        "id": "tx1",
        "profile_name": "Nancy Pelosi",
        "profile_id": "nancy-pelosi",
        "ticker": "NVDA",
        "type": "BUY",
        "amount": "$1,000,000 - $5,000,000",
        "price": 120.50,
        "timestamp": "2026-02-18T14:30:00Z"
    },
    {
        "id": "tx2",
        "profile_name": "Warren Buffett",
        "profile_id": "warren-buffett",
        "ticker": "AAPL",
        "type": "HOLD",
        "amount": "915M Shares",
        "price": 180.20,
        "timestamp": "2026-02-15T09:00:00Z"
    }
]

@router.get("/", response_model=List[Transaction])
async def get_latest_transactions(limit: int = 10):
    return MOCK_TRANSACTIONS[:limit]

@router.get("/{profile_id}", response_model=List[Transaction])
async def get_profile_transactions(profile_id: str):
    return [tx for tx in MOCK_TRANSACTIONS if tx["profile_id"] == profile_id]
