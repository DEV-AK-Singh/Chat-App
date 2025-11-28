import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Video, UserPlus } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import type { ContactsPageProps, Contact } from '../types';
import { mockContacts } from '../data/mockData';

const ContactsPage: React.FC<ContactsPageProps> = ({ onBack, onNavigate, onStartChat, onStartCall }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'contacts'>('contacts');

  const filtered = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    if (activeTab === 'contacts') {
      return matchesSearch && contact.isContact;
    }
    return matchesSearch;
  });

  const handleMessage = (contact: Contact) => {
    onStartChat(contact);
  };

  const handleVoiceCall = (contact: Contact) => {
    onStartCall(contact, 'voice');
  };

  const handleVideoCall = (contact: Contact) => {
    onStartCall(contact, 'video');
  };

  const handleAddContact = (contact: Contact) => {
    // In a real app, this would add to contacts
    alert(`Added ${contact.name} to contacts`);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header 
        title="Contacts" 
        showBack 
        onBack={onBack} 
      />

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 mb-4">
          <Search size={18} className="text-gray-600" />
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent focus:outline-none py-3 text-gray-800 font-light text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-full transition ${activeTab === 'contacts' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            My Contacts
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full transition ${activeTab === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            All Users
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {contact.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{contact.name}</p>
                <p className={`text-xs font-light ${contact.status === 'online' ? 'text-green-600' : 'text-gray-600'}`}>
                  {contact.status === 'online' ? '● Online' : `● Last seen ${contact.lastSeen}`}
                </p>
                <p className="text-xs font-light text-gray-500">{contact.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!contact.isContact && activeTab === 'all' && (
                <button 
                  onClick={() => handleAddContact(contact)}
                  className="text-gray-600 hover:text-black transition p-2 hover:bg-gray-200 rounded-full"
                  title="Add to contacts"
                >
                  <UserPlus size={18} />
                </button>
              )}
              <button 
                onClick={() => handleMessage(contact)}
                className="text-gray-600 hover:text-black transition p-2 hover:bg-gray-200 rounded-full"
                title="Message"
              >
                <MessageCircle size={18} />
              </button>
              <button 
                onClick={() => handleVoiceCall(contact)}
                className="text-gray-600 hover:text-black transition p-2 hover:bg-gray-200 rounded-full"
                title="Voice Call"
              >
                <Phone size={18} />
              </button>
              <button 
                onClick={() => handleVideoCall(contact)}
                className="text-gray-600 hover:text-black transition p-2 hover:bg-gray-200 rounded-full"
                title="Video Call"
              >
                <Video size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation currentScreen="contacts" onNavigate={onNavigate} />
    </div>
  );
};

export default ContactsPage;