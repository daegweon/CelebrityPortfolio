import time
import schedule
from app.scrapers.engine import CapitolTradesScraper, SEC13FScraper
from app.db.manager import SupabaseManager

class ScrapingScheduler:
    """
    CelebrityPortfolio의 데이터 수집을 자동화하는 스케줄러 클래스입니다.
    """
    def __init__(self):
        self.db = SupabaseManager()
        self.capitol_scraper = CapitolTradesScraper()
        self.sec_scraper = SEC13FScraper()

    def job_capitol_trades(self):
        """국회의원 거래 내역을 수집하여 DB에 저장하는 작업"""
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting Capitol Trades scraping job...")
        trades = self.capitol_scraper.get_latest_trades(limit=20)
        
        for trade in trades:
            # 실무에서는 데이터 중복 체크 로직이 포함됩니다.
            # self.db.insert_transaction(trade)
            print(f"   - Processed trade: {trade['politician']} ({trade['ticker']})")
        print("[*] Capitol Trades job completed.")

    def job_sec_13f(self):
        """기관 투자자 13F 공시를 확인하고 포트폴리오를 갱신하는 작업"""
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting SEC 13F check job...")
        # 추적 대상 CIK 목록을 가져와서 루프를 돕니다.
        # 예: Warren Buffett CIK = '0001067983'
        # self.sec_scraper.fetch_filing_metadata('0001067983')
        print("[*] SEC 13F check job completed.")

    def run_forever(self):
        """스케줄러 실행 루프"""
        # 1. 국회의원 거래 내역은 매시간 체크
        schedule.every(1).hours.do(self.job_capitol_trades)
        
        # 2. SEC 13F 공시는 매일 4번 체크 (공시 집중 기간 고려)
        schedule.every(6).hours.do(self.job_sec_13f)
        
        # 3. 테스트용: 즉시 실행 (선택 사항)
        self.job_capitol_trades()
        self.job_sec_13f()

        print("[🚀] Scheduler started and running...")
        while True:
            schedule.run_pending()
            time.sleep(60)

if __name__ == "__main__":
    scheduler = ScrapingScheduler()
    scheduler.run_forever()
