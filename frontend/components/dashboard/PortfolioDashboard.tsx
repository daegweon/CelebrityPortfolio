import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Activity, 
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PortfolioHistoryChart, SectorDistributionChart } from './Charts';

interface PortfolioDashboardProps {
  profile: any;
  holdings?: any[];
}

const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ profile, holdings = [] }) => {
  // Mock history data for chart
  const historyData = [
    { date: '2025-Q1', value: 92 },
    { date: '2025-Q2', value: 105 },
    { date: '2025-Q3', value: 98 },
    { date: '2025-Q4', value: 115 },
    { date: '2026-Q1', value: 124.5 },
  ];

  const sectorData = [
    { name: "Tech", value: 64 },
    { name: "Comm", value: 12 },
    { name: "Fin", value: 10 },
    { name: "Health", value: 8 },
    { name: "Others", value: 6 },
  ];

  // Use real data or fallback to mock
  const stats = [
    { label: "Total Value", value: profile?.total_assets_display || "$0", change: "+12.4%", upward: true, icon: <DollarSign size={20} /> },
    { label: "Quarterly Return", value: "+8.2%", change: "vs S&P 500 (+3.1%)", upward: true, icon: <TrendingUp size={20} /> },
    { label: "Top Holding", value: holdings[0] ? `${holdings[0].ticker} (${holdings[0].portfolio_weight}%)` : "N/A", change: "Unchanged", upward: null, icon: <PieChart size={20} /> },
    { label: "Holdings Count", value: `${holdings.length} Stocks`, change: "Total diversity", upward: true, icon: <Activity size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-10">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <a href="/" className="hover:text-slate-300">Home</a>
            <ChevronRight size={14} />
            <a href="/dashboard" className="hover:text-slate-300">Dashboard</a>
            <ChevronRight size={14} />
            <span className="text-blue-400 font-medium">{profile?.name || 'Loading...'}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20">
              {profile?.name?.charAt(0) || '?'}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{profile?.name} Portfolio</h1>
              <p className="text-slate-400 mt-1 flex items-center gap-2">
                <Calendar size={14} />
                Last updated: Feb 18, 2026 • Source: SEC 13F-HR & Capitol Trades
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
            Set Alert <Activity size={16} />
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
            Export Data <ExternalLink size={16} />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-slate-500 p-2 bg-slate-800/50 rounded-lg">{stat.icon}</div>
              {stat.upward !== null && (
                <div className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${stat.upward ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {stat.upward ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                </div>
              )}
            </div>
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.upward === null && <div className="text-xs text-slate-500 mt-2">{stat.change}</div>}
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Portfolio History Chart */}
          <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Activity size={18} className="text-blue-400" /> Portfolio Performance History
            </h3>
            <PortfolioHistoryChart data={historyData} />
          </div>

          {/* Holdings Table */}
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
              <h3 className="font-bold text-lg">Top Holdings</h3>
              <button className="text-blue-400 text-sm font-medium hover:underline">View All {holdings.length} Stocks</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800/50">
                    <th className="px-6 py-4 font-semibold">Ticker</th>
                    <th className="px-6 py-4 font-semibold">Weight</th>
                    <th className="px-6 py-4 font-semibold">Value</th>
                    <th className="px-6 py-4 font-semibold text-right">Performance (3M)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {holdings.map((stock, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                            {stock.ticker}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{stock.ticker}</div>
                            <div className="text-xs text-slate-500">{stock.company_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full mb-1">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${stock.portfolio_weight}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-300">{stock.portfolio_weight}%</span>
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold">${stock.market_value?.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="font-bold text-green-400">+1.2%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                          Status: <span className={stock.change_type === 'BUY' ? 'text-blue-400' : 'text-slate-400'}>{stock.change_type}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar / Insights */}
        <div className="flex flex-col gap-6">
          {/* Sector Allocation */}
          <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <PieChart size={18} className="text-blue-400" /> Sector Allocation
            </h3>
            <SectorDistributionChart data={sectorData} />
          </div>

          {/* Strategy Insight */}
          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-blue-500/10 transition-transform group-hover:scale-110 duration-500">
              <TrendingUp size={120} />
            </div>
            <h3 className="font-bold text-lg mb-3 relative">AI Strategy Insight</h3>
            <p className="text-sm text-blue-200/70 leading-relaxed mb-4 relative">
              이 포트폴리오는 현재 **AI 및 반도체 섹터**에 대한 집중 투자를 보이고 있습니다. 
              최근 3개월간 기술주 매수세가 뚜렷하며, 특히 레버리지 옵션을 통한 공격적인 수익 극대화 전략을 취하고 있습니다.
            </p>
            <button className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all relative">
              Full AI Analysis <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDashboard;
