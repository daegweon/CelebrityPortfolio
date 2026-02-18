'use client';

import React, { useEffect, useState } from 'react';
import PortfolioDashboard from '@/components/dashboard/PortfolioDashboard';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';

export default function DashboardPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [profile, setProfile] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // 1. Fetch Profile by slug
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // 2. Fetch Portfolio for this profile
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('profile_id', profileData.id)
          .order('portfolio_weight', { ascending: false });

        if (portfolioError) throw portfolioError;
        setPortfolio(portfolioData || []);

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
