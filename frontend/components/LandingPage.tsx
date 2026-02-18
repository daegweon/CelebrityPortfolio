import React from 'react';
import { ArrowUpRight, TrendingUp, Shield, BarChart3, Users, Zap } from 'lucide-react';
import { AuthStatus } from './AuthStatus';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BarChart3 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">CelebrityPortfolio</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#legends" className="hover:text-white transition-colors">Legends</a>
            <a href="#data" className="hover:text-white transition-colors">Data Engine</a>
          </div>
          <AuthStatus />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Live Updates: Nancy Pelosi just bought NVDA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Invest Like the <br className="hidden md:block" /> 1% of the 1%.
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
            고위 공직자와 월가의 전설적인 투자자들의 실시간 포트폴리오를 추적하세요. 
            그들의 움직임을 데이터로 읽고 당신의 투자 전략을 업그레이드하십시오.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group">
              Start Tracking Now
              <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              Explore Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Mock Preview */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pb-8 md:pb-0">
              <div className="text-4xl font-bold mb-2">$4.2T+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Tracked Assets</div>
            </div>
            <div className="py-8 md:py-0">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">Whale Profiles</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-4xl font-bold mb-2">Real-time</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">SEC Feed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why CelebrityPortfolio?</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">단순한 공시 정보를 넘어, 인텔리전스 데이터를 제공합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Zap className="text-yellow-400" />, title: "Instant Alerts", desc: "13F 공시가 올라오는 즉시 푸시 알림을 통해 가장 먼저 변화를 감지합니다." },
            { icon: <TrendingUp className="text-green-400" />, title: "Alpha Analysis", desc: "S&P 500 대비 해당 투자자의 초과 수익률(Alpha)을 실시간으로 계산합니다." },
            { icon: <Shield className="text-blue-400" />, title: "SEC Verified", desc: "모든 데이터는 SEC EDGAR 원본 공시와 Capitol Trades 데이터셋을 기반으로 합니다." },
            { icon: <Users className="text-purple-400" />, title: "Group Insights", desc: "특정 섹터나 인물 그룹별로 집계된 매매 트렌드를 한눈에 파악합니다." },
            { icon: <BarChart3 className="text-rose-400" />, title: "Deep Visuals", desc: "복잡한 비중 변화를 히트맵과 인터랙티브 차트로 시각화하여 제공합니다." },
            { icon: <ArrowUpRight className="text-cyan-400" />, title: "Smart Mockup", desc: "그들의 포트폴리오를 그대로 복제했을 때의 예상 성과를 시뮬레이션합니다." },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-800/50 p-8 rounded-2xl hover:border-slate-700 transition-colors group">
              <div className="mb-6 bg-slate-800/50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-slate-800 transition-colors italic">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 text-center text-slate-600">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">© 2026 CelebrityPortfolio. All rights reserved. Data for informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
