from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_profiles():
    return [{"id": "warren-buffett", "name": "Warren Buffett", "group": "Value Legends"}]

@router.get("/{id}")
async def get_profile_detail(id: str):
    return {"id": id, "name": "Detail of " + id}
