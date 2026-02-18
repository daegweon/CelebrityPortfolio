'use client';

import React, { useEffect, useState } from 'react';
import PortfolioDashboard from '../../../components/dashboard/PortfolioDashboard';
import { supabase } from '../../../lib/supabase';
import { useParams } from 'next/navigation';

// Define explicit types to avoid 'never' inference
interface ProfileData {
  id: string;
  name: string;
  slug: string;
  total_assets_display?: string;
  [key: string]: any;
}

interface PortfolioItem {
  ticker: string;
  portfolio_weight: number;
  market_value: number;
  company_name?: string;
  change_type?: string;
  [key: string]: any;
}

export default function DashboardPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Use explicit types in useState
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData as ProfileData);

        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('profile_id', profileData.id)
          .order('portfolio_weight', { ascending: false });

        if (portfolioError) throw portfolioError;
        setPortfolio((portfolioData as PortfolioItem[]) || []);

      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Fetching Real-time Whale Data...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-slate-400 mb-6">{error || "The profile you're looking for doesn't exist yet."}</p>
          <a href="/" className="text-blue-500 font-bold hover:underline">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <PortfolioDashboard 
      profile={profile} 
      holdings={portfolio} 
    />
  );
}
