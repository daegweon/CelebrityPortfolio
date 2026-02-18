-- CelebrityPortfolio Database Schema (PostgreSQL / Supabase)
-- 이 SQL 스크립트는 Supabase SQL Editor에서 실행하여 테이블을 생성할 수 있습니다.

-- 1. Profiles (Target Individuals/Legends)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL, -- 예: 'nancy-pelosi', 'warren-buffett'
    name TEXT NOT NULL,
    group_type TEXT NOT NULL, -- 'Politicians', 'Value Legends', 'Macro Legends' 등
    description TEXT,
    total_assets_display TEXT, -- '$120M', '$140B' 등 표시용
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Portfolios (Current Holdings)
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    company_name TEXT,
    shares BIGINT NOT NULL,
    market_value DECIMAL(20, 2),
    portfolio_weight DECIMAL(5, 2),
    change_type TEXT, -- 'BUY', 'SELL', 'HOLD', 'NEW'
    last_reported_date DATE,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Transactions (Trade History Feed)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    transaction_type TEXT NOT NULL, -- 'BUY', 'SELL'
    amount_range TEXT, -- '$1,001 - $15,000' 등 (공직자 공시 기준)
    price DECIMAL(10, 2),
    shares_count BIGINT,
    transaction_date DATE NOT NULL,
    disclosure_date DATE, -- 공시일
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_profiles_slug ON profiles(slug);
CREATE INDEX idx_portfolios_profile_id ON portfolios(profile_id);
CREATE INDEX idx_transactions_profile_id ON transactions(profile_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);

-- Enable Row Level Security (RLS) for public read
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON transactions FOR SELECT USING (true);
