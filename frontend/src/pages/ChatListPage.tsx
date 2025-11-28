import React, { useState, useRef } from 'react';
import { Search, Plus, MessageCircle, Pin, Bell, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import type { ChatListPageProps, Conversation, Contact } from '../types';
import { mockConversations, mockContacts, getContactById } from '../data/mockData';

const ChatListPage: React.FC<ChatListPageProps> = ({ profile, onSelectChat, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);
  
  const filtered = mockConversations.filter(conv => {
    const contact = getContactById(conv.contactId);
    return contact?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleChatSelect = (conv: Conversation) => {
    const contact = getContactById(conv.contactId);
    if (contact) {
      onSelectChat(conv, contact);
    }
  };

  const handleLongPressStart = (convId: number) => {
    const timer = setTimeout(() => {
      setMenuOpen(convId);
    }, 500); // 500ms for long press
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handlePinChat = (convId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would update the conversation pinned status
    alert(`Chat ${convId} ${mockConversations.find(c => c.id === convId)?.pinned ? 'unpinned' : 'pinned'}`);
    setMenuOpen(null);
  };

  const handleMuteChat = (convId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would update the conversation muted status
    alert(`Chat ${convId} ${mockConversations.find(c => c.id === convId)?.muted ? 'unmuted' : 'muted'}`);
    setMenuOpen(null);
  };

  const handleDeleteChat = (convId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would delete the conversation
    if (window.confirm('Are you sure you want to delete this chat?')) {
      alert(`Chat ${convId} deleted`);
    }
    setMenuOpen(null);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header 
        title="Messages" 
        showSettings 
        onSettings={() => onNavigate('settings')} 
      />

      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4">
            <Search size={18} className="text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none py-3 text-gray-800 font-light text-sm"
            />
          </div>
          <button onClick={() => onNavigate('contacts')} className="p-3 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition">
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {filtered.map((conv) => {
          const contact = getContactById(conv.contactId);
          if (!contact) return null;
          
          return (
            <div
              key={conv.id}
              className="relative"
            >
              <div
                onClick={() => handleChatSelect(conv)}
                onTouchStart={() => handleLongPressStart(conv.id)}
                onTouchEnd={handleLongPressEnd}
                onMouseDown={() => handleLongPressStart(conv.id)}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition flex justify-between items-start active:bg-gray-200"
              >
                <div className="flex-1 flex gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shrink-0 text-lg">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{contact.name}</span>
                      {conv.pinned && <Pin size={14} className="text-gray-600" />}
                    </div>
                    <p className="text-gray-600 text-sm font-light truncate">{conv.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right ml-2 shrink-0 flex flex-col justify-end items-end gap-2">
                  <p className="text-gray-500 text-xs font-light">{conv.timestamp}</p>
                  {conv.unread > 0 && (
                    <div className="mt-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>

              {/* Context Menu */}
              {menuOpen === conv.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg mx-4 w-full max-w-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Chat Options</h3>
                      <p className="text-sm text-gray-600 mt-1">{contact.name}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => handlePinChat(conv.id, e)}
                      className="w-full text-left px-4 py-3 text-sm font-light hover:bg-gray-100 flex items-center gap-3 border-b border-gray-200"
                    >
                      <Pin size={18} className="text-gray-600" />
                      {conv.pinned ? 'Unpin Chat' : 'Pin Chat'}
                    </button>
                    
                    <button 
                      onClick={(e) => handleMuteChat(conv.id, e)}
                      className="w-full text-left px-4 py-3 text-sm font-light hover:bg-gray-100 flex items-center gap-3 border-b border-gray-200"
                    >
                      <Bell size={18} className="text-gray-600" />
                      {conv.muted ? 'Unmute Chat' : 'Mute Chat'}
                    </button>
                    
                    <button 
                      onClick={(e) => handleDeleteChat(conv.id, e)}
                      className="w-full text-left px-4 py-3 text-sm font-light hover:bg-gray-100 flex items-center gap-3 text-red-600"
                    >
                      <Trash2 size={18} />
                      Delete Chat
                    </button>

                    <button 
                      onClick={() => setMenuOpen(null)}
                      className="w-full text-center px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 border-t border-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomNavigation currentScreen="chats" onNavigate={onNavigate} />
    </div>
  );
};

export default ChatListPage;