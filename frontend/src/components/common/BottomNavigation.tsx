import React from 'react';
import { MessageCircle, Users, Clock, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-200 flex justify-around p-3 bg-white max-w-md mx-auto">
      <button 
        onClick={() => onNavigate('chats')} 
        className={`flex flex-col items-center gap-1 py-2 transition ${currentScreen === 'chats' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
      >
        <MessageCircle size={24} />
        <span className="text-xs font-light">Chats</span>
      </button>
      <button 
        onClick={() => onNavigate('contacts')} 
        className={`flex flex-col items-center gap-1 py-2 transition ${currentScreen === 'contacts' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
      >
        <Users size={24} />
        <span className="text-xs font-light">Contacts</span>
      </button>
      <button 
        onClick={() => onNavigate('calls')} 
        className={`flex flex-col items-center gap-1 py-2 transition ${currentScreen === 'calls' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
      >
        <Clock size={24} />
        <span className="text-xs font-light">Calls</span>
      </button> 
      <button 
        onClick={() => onNavigate('settings')} 
        className={`flex flex-col items-center gap-1 py-2 transition ${currentScreen === 'settings' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
      >
        <Settings size={24} />
        <span className="text-xs font-light">Settings</span>
      </button> 
    </div>
  );
};

export default BottomNavigation;