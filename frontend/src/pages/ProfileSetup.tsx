import React, { useState } from 'react';
import { Users, Lock, Eye, EyeOff } from 'lucide-react';
import type { ProfileSetupProps } from '../types';

const ProfileSetup: React.FC<ProfileSetupProps> = ({ phone, onComplete }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [security, setSecurity] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleComplete = (): void => {
    if (displayName.trim()) {
      onComplete({ 
        displayName, 
        status: status || 'Hey there! I am using DAMRU', 
        phone: `+91 ${phone}`,
        avatar: '👤',
        security 
      });
    } else {
      setError('Please enter your display name');
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-6xl mb-8 rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center">
        <Users size={40} />
      </div>
      <h1 className="text-3xl font-semibold mb-2 text-black">Complete Your Profile</h1>
      <p className="text-gray-600 font-light mb-10">Let's get you started</p>
      
      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-gray-800 font-light"
        />
        
        <input
          type="text"
          placeholder="Status message (optional)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-gray-800 font-light"
        />
        
        <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-black transition">
          <span className="font-light text-gray-700 flex items-center gap-2">
            <Lock size={18} /> Security Protection
          </span>
          <button
            onClick={() => setSecurity(!security)}
            className={`p-2 rounded-lg transition ${security ? 'bg-black' : 'bg-gray-300'}`}
          >
            {security ? <Eye size={18} color="white" /> : <EyeOff size={18} />}
          </button>
        </div>
        
        {error && <p className="text-red-600 text-sm font-light text-center">{error}</p>}
        
        <button
          onClick={handleComplete}
          className="w-full bg-black text-white p-4 rounded-lg font-semibold hover:bg-gray-900 transition mt-6"
        >
          Start Messaging
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;