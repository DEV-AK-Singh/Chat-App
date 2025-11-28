import React from 'react';
import { PhoneOff, Mic, Volume2, Video, Download, X } from 'lucide-react';
import type { Contact } from '../../types';

interface CallInterfaceProps {
  contact: Contact;
  type: 'voice' | 'video';
  callTime: number;
  isMuted: boolean;
  isSpeaker: boolean;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onBack: () => void;
}

const CallInterface: React.FC<CallInterfaceProps> = ({
  contact,
  type,
  callTime,
  isMuted,
  isSpeaker,
  onEndCall,
  onToggleMute,
  onToggleSpeaker,
  onBack
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white p-6">
      <button onClick={onBack} className="absolute top-4 left-4 p-2 hover:bg-gray-800 rounded-lg">
        <X size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl mb-6">
          {contact.avatar}
        </div>
        <h1 className="text-3xl font-semibold mb-2">{contact.name}</h1>
        <p className="text-lg font-light text-gray-400 mb-1">
          {type === 'voice' ? 'Voice Call' : 'Video Call'}
        </p>
        <p className="text-lg font-light text-gray-400">{formatTime(callTime)}</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={onToggleMute}
          className={`p-4 rounded-full transition ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <Mic size={24} />
        </button>
        <button
          onClick={onToggleSpeaker}
          className={`p-4 rounded-full transition ${isSpeaker ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <Volume2 size={24} />
        </button>
        {type === 'voice' && (
          <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition">
            <Video size={24} />
          </button>
        )}
        <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition">
          <Download size={24} />
        </button>
        <button
          onClick={onEndCall}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
};

export default CallInterface;