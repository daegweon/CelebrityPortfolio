from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class Profile(BaseModel):
    id: str
    name: str
    group: str
    description: str
    total_assets: str
    last_updated: str

# 임시 데이터 (Mock Data)
MOCK_PROFILES = [
    {
        "id": "nancy-pelosi",
        "name": "Nancy Pelosi",
        "group": "Politicians",
        "description": "Speaker Emerita of the House, known for high-performance tech stock trades.",
        "total_assets": "$120M",
        "last_updated": "2026-02-18T14:30:00Z"
    },
    {
        "id": "warren-buffett",
        "name": "Warren Buffett",
        "group": "Value Legends",
        "description": "Chairman and CEO of Berkshire Hathaway, the Oracle of Omaha.",
        "total_assets": "$140B",
        "last_updated": "2026-02-15T09:00:00Z"
    },
    {
        "id": "stanley-druckenmiller",
        "name": "Stanley Druckenmiller",
        "group": "Macro Legends",
        "description": "Founder of Duquesne Family Office, legendary macro investor.",
        "total_assets": "$6.4B",
        "last_updated": "2026-02-17T11:20:00Z"
    }
]

@router.get("/", response_model=List[Profile])
async def get_profiles(group: Optional[str] = None):
    if group:
        filtered = [p for p in MOCK_PROFILES if p["group"].lower() == group.lower()]
        return filtered
    return MOCK_PROFILES

@router.get("/{profile_id}", response_model=Profile)
async def get_profile(profile_id: str):
    profile = next((p for p in MOCK_PROFILES if p["id"] == profile_id), None)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
