import os
from supabase import create_client, Client
from typing import List, Dict, Optional

class SupabaseManager:
    """
    CelebrityPortfolio의 데이터베이스(Supabase) 연동을 관리하는 매니저 클래스입니다.
    """
    def __init__(self):
        self.url: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
        self.key: str = os.getenv("SUPABASE_KEY", "your-anon-key")
        self.supabase: Client = create_client(self.url, self.key)

    def insert_profile(self, profile_data: Dict) -> Dict:
        """새로운 유명 인사 프로필을 추가합니다."""
        response = self.supabase.table("profiles").insert(profile_data).execute()
        return response.data

    def get_profile_by_slug(self, slug: str) -> Optional[Dict]:
        """슬러그(slug)로 특정 인물 정보를 조회합니다."""
        response = self.supabase.table("profiles").select("*").eq("slug", slug).single().execute()
        return response.data

    def upsert_portfolio(self, profile_id: str, portfolio_data: List[Dict]):
        """특정 인물의 포트폴리오 정보를 업데이트하거나 새로 추가합니다."""
        # 기존 포트폴리오를 지우고 새로 넣거나(Full Sync), Upsert 로직을 구현합니다.
        for item in portfolio_data:
            item["profile_id"] = profile_id
            self.supabase.table("portfolios").upsert(item, on_conflict="profile_id, ticker").execute()

    def insert_transaction(self, transaction_data: Dict) -> Dict:
        """새로운 거래 내역을 실시간 피드에 추가합니다."""
        response = self.supabase.table("transactions").insert(transaction_data).execute()
        return response.data

    def get_latest_transactions(self, limit: int = 20) -> List[Dict]:
        """최신 거래 내역 피드를 조회합니다."""
        response = self.supabase.table("transactions").select("*, profiles(name)").order("transaction_date", desc=True).limit(limit).execute()
        return response.data

if __name__ == "__main__":
    # 환경변수 설정 확인 후 테스트 가능
    # manager = SupabaseManager()
    # print(manager.get_latest_transactions(5))
    pass
