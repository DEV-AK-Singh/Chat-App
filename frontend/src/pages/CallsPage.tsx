import React, { useState, useEffect } from 'react';
import { Phone, Video, ChevronRight } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import CallInterface from '../components/chat/CallInterface';
import type { CallsPageProps, ActiveCall, CallHistory } from '../types';
import { mockCallHistory, mockContacts, getContactById, getConversationByContactId } from '../data/mockData';

const CallsPage: React.FC<CallsPageProps> = ({ onBack, onNavigate, onStartCall }) => {
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [callTime, setCallTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  const [callHistory, setCallHistory] = useState<CallHistory[]>(mockCallHistory);

  useEffect(() => {
    if (!activeCall) return;
    const timer = setInterval(() => setCallTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [activeCall]);

  const handleStartCall = (contactId: number, type: 'voice' | 'video') => {
    const contact = getContactById(contactId);
    if (contact) {
      setActiveCall({ contact, type });
      setCallTime(0);
      
      // Add to call history
      const newCall: CallHistory = {
        id: callHistory.length + 1,
        contactId,
        type,
        duration: '0:00',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        missed: false,
        incoming: false
      };
      setCallHistory([newCall, ...callHistory]);
    }
  };

  const handleCallItemClick = (contactId: number) => {
    const contact = getContactById(contactId);
    if (contact) {
      let conversation = getConversationByContactId(contactId);
      if (!conversation) {
        // Create new conversation if doesn't exist
        conversation = {
          id: Date.now(),
          contactId: contact.id,
          lastMessage: 'Start a conversation...',
          timestamp: 'Now',
          unread: 0,
          encrypted: true,
          pinned: false,
          muted: false
        };
      }
      // Navigate to chat with this contact
      onStartCall(contact, 'voice'); // This will be handled by the parent to open chat
    }
  };

  const endCall = () => {
    setActiveCall(null);
    setIsMuted(false);
    setIsSpeaker(false);
    setCallTime(0);
  };

  if (activeCall) {
    return (
      <CallInterface
        contact={activeCall.contact}
        type={activeCall.type}
        callTime={callTime}
        isMuted={isMuted}
        isSpeaker={isSpeaker}
        onEndCall={endCall}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleSpeaker={() => setIsSpeaker(!isSpeaker)}
        onBack={endCall}
      />
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header 
        title="Call History" 
        showBack 
        onBack={onBack} 
      />

      <div className="flex-1 overflow-y-auto pb-20">
        {callHistory.map((call) => {
          const contact = getContactById(call.contactId);
          if (!contact) return null;

          return (
            <div
              key={call.id}
              onClick={() => handleCallItemClick(call.contactId)}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${call.missed ? 'bg-red-100' : 'bg-gray-100'}`}>
                  {call.type === 'voice' ? 
                    <Phone size={20} className={call.missed ? 'text-red-600' : 'text-gray-600'} /> : 
                    <Video size={20} className={call.missed ? 'text-red-600' : 'text-gray-600'} />
                  }
                </div>
                <div>
                  <p className={`font-semibold ${call.missed ? 'text-red-600' : 'text-gray-900'}`}>
                    {contact.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-light text-gray-600">
                    {call.missed ? (
                      <span className="text-red-600">Missed call</span>
                    ) : call.incoming ? (
                      <span>Incoming call • {call.duration}</span>
                    ) : (
                      <span>Outgoing call • {call.duration}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-light text-gray-600">{call.timestamp}</p>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating call button */}
      <button 
        onClick={() => onNavigate('contacts')}
        className="fixed bottom-24 right-4 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition"
      >
        <Phone size={24} />
      </button>

      <BottomNavigation currentScreen="calls" onNavigate={onNavigate} />
    </div>
  );
};

export default CallsPage;