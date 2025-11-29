import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import OTPScreen from './pages/OTPScreen';
import ProfileSetup from './pages/ProfileSetup';
import ChatListPage from './pages/ChatListPage';
import ChatInterface from './pages/ChatInterface';
import ContactsPage from './pages/ContactsPage';
import CallsPage from './pages/CallsPage';
import SettingsPage from './pages/SettingsPage';
import type { UserProfile, Conversation, Contact } from './types';
import { getConversationByContactId } from './data/mockData';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSplashComplete = (): void => {
    setCurrentScreen('otp');
  };

  const handleOTPVerified = (phone: string): void => {
    setCurrentScreen('profile');
  };

  const handleProfileComplete = (profile: UserProfile): void => {
    setUserProfile(profile);
    setCurrentScreen('chats');
  };

  const handleSelectChat = (conversation: Conversation, contact: Contact): void => {
    setSelectedChat(conversation);
    setSelectedContact(contact);
    setCurrentScreen('chat');
  };

  const handleStartChat = (contact: Contact): void => {
    let conversation = getConversationByContactId(contact.id);
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
    setSelectedChat(conversation);
    setSelectedContact(contact);
    setCurrentScreen('chat');
  };

  const handleStartCall = (contact: Contact, type: 'voice' | 'video'): void => {
    setSelectedContact(contact);
    // For now, navigate to calls page
    setCurrentScreen('calls');
  };

  const handleUpdateProfile = (profile: UserProfile): void => {
    setUserProfile(profile);
  };

  const handleNavigate = (screen: string): void => {
    setCurrentScreen(screen);
  };

  const handleBack = (): void => {
    if (currentScreen === 'chat' || currentScreen === 'contacts' || currentScreen === 'calls' || currentScreen === 'settings') {
      setCurrentScreen('chats');
    }
  };

  const handleLogout = (): void => {
    setUserProfile(null);
    setSelectedChat(null);
    setSelectedContact(null);
    setCurrentScreen('splash');
  };

  const renderScreen = (): React.ReactNode => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'otp':
        return <OTPScreen onVerified={handleOTPVerified} />;
      case 'profile':
        return <ProfileSetup phone="9876543210" onComplete={handleProfileComplete} />;
      case 'chats':
        return (
          <ChatListPage
            profile={userProfile}
            onSelectChat={handleSelectChat}
            onNavigate={handleNavigate}
          />
        );
      case 'chat':
        return (
          <ChatInterface
            conversation={selectedChat}
            contact={selectedContact}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        );
      case 'contacts':
        return (
          <ContactsPage 
            onBack={handleBack} 
            onNavigate={handleNavigate}
            onStartChat={handleStartChat}
            onStartCall={handleStartCall}
          />
        );
      case 'calls':
        return (
          <CallsPage 
            onBack={handleBack} 
            onNavigate={handleNavigate}
            onStartCall={handleStartCall}
          />
        );
      case 'settings':
        return (
          <SettingsPage 
            profile={userProfile} 
            onBack={handleBack} 
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg md:rounded-xl overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default App;