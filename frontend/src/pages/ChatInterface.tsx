import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus } from 'lucide-react';
import Header from '../components/common/Header';
import MessageBubble from '../components/chat/MessageBubble';
import CallInterface from '../components/chat/CallInterface';
import SecurityBadge from '../components/common/SecurityBadge';
import type { ChatInterfaceProps, Message, ActiveCall } from '../types';

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversation, contact, onBack, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi there!', sender: 'other', timestamp: '10:30 AM', read: true, type: 'text' },
    { id: 2, text: 'Hey! How are you?', sender: 'user', timestamp: '10:31 AM', read: true, type: 'text' },
    { id: 3, text: 'I\'m doing great! Talk later?', sender: 'other', timestamp: '10:32 AM', read: false, type: 'text' },
  ]);
  const [input, setInput] = useState<string>('');
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  const [callTime, setCallTime] = useState<number>(0);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!activeCall) return;
    const timer = setInterval(() => setCallTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [activeCall]);

  const handleSend = async (): Promise<void> => {
    if (input.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        type: 'text'
      }]);
      setInput('');
    }
  };

  const handleVoiceCall = (): void => {
    if (contact) {
      setActiveCall({ contact, type: 'voice' });
      setCallTime(0);
    }
  };

  const handleVideoCall = (): void => {
    if (contact) {
      setActiveCall({ contact, type: 'video' });
      setCallTime(0);
    }
  };

  const endCall = (): void => {
    setActiveCall(null);
    setIsMuted(false);
    setIsSpeaker(false);
    setCallTime(0);
  };

  if (activeCall && contact) {
    return (
      <CallInterface
        contact={contact}
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

  if (!conversation || !contact) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p>No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header 
        title={contact.name}
        showBack
        showCallButtons
        onBack={onBack}
        onVoiceCall={handleVoiceCall}
        onVideoCall={handleVideoCall}
      />

      <SecurityBadge 
        type="lock" 
        message="Messages are end-to-end encrypted" 
        subMessage="No one outside this chat can read them"
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEnd} />
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-2">
          <button className="p-3 text-gray-600 hover:text-black transition">
            <Plus size={20} />
          </button>
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-gray-800 font-light text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-black text-white p-3 rounded-full hover:bg-gray-900 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;