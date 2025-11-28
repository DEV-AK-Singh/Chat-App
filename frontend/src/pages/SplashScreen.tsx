import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import type { SplashScreenProps } from '../types';

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="text-6xl mb-8 p-6 bg-white rounded-full">
        <Lock size={48} className="text-black" />
      </div>
      <h1 className="text-5xl font-bold mb-2">DAMRU</h1>
      <p className="text-lg font-light text-gray-400">Secure Messaging</p>
      <div className="mt-16 flex gap-3">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="mt-16 text-sm font-light text-gray-500">End-to-End Encrypted</p>
    </div>
  );
};

export default SplashScreen;