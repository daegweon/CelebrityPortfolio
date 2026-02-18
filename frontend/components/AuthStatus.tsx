'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, LogIn, LogOut, Settings, Bell, Bookmark } from 'lucide-react';

export const AuthStatus = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    // 이 예시에서는 Google 소셜 로그인을 시도합니다.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) console.error('Error signing in:', error.message);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
  };

  if (loading) return <div className="h-8 w-8 rounded-full bg-slate-800 animate-pulse" />;

  if (!user) {
    return (
      <button 
        onClick={handleSignIn}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
      >
        <LogIn size={16} /> Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-slate-400">
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><Bell size={18} /></button>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><Bookmark size={18} /></button>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><Settings size={18} /></button>
      </div>
      <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-white">{user.user_metadata?.full_name || user.email}</div>
          <div className="text-[10px] text-slate-500">Premium Member</div>
        </div>
        <button 
          onClick={handleSignOut}
          className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-red-500/50 group transition-all"
          title="Sign Out"
        >
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full rounded-full group-hover:opacity-50 transition-opacity" />
          ) : (
            <User size={20} className="group-hover:text-red-500 transition-colors" />
          )}
          <LogOut size={16} className="absolute opacity-0 group-hover:opacity-100 text-red-500 transition-opacity" />
        </button>
      </div>
    </div>
  );
};
