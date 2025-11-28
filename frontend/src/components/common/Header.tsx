import React from 'react';
import { ChevronRight, Settings, Phone, Video } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  showCallButtons?: boolean;
  onBack?: () => void;
  onSettings?: () => void;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showSettings = false, 
  showCallButtons = false,
  onBack, 
  onSettings,
  onVoiceCall,
  onVideoCall
}) => {
  return (
    <div className="bg-black text-white p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack} className="hover:bg-gray-800 p-2 rounded-lg transition">
            <ChevronRight size={24} className="rotate-180" />
          </button>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex gap-2">
        {showCallButtons && (
          <>
            <button onClick={onVoiceCall} className="p-2 hover:bg-gray-800 rounded-lg transition">
              <Phone size={20} />
            </button>
            <button onClick={onVideoCall} className="p-2 hover:bg-gray-800 rounded-lg transition">
              <Video size={20} />
            </button>
          </>
        )}
        {showSettings && (
          <button onClick={onSettings} className="p-2 hover:bg-gray-800 rounded-lg transition">
            <Settings size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;