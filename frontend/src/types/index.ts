export interface Contact {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  avatar: string;
  phone: string;
  isContact: boolean;
}

export interface Conversation {
  id: number;
  contactId: number;
  lastMessage: string;
  timestamp: string;
  unread: number;
  encrypted: boolean;
  pinned: boolean;
  muted: boolean;
}

export interface CallHistory {
  id: number;
  contactId: number;
  type: 'voice' | 'video';
  duration: string;
  timestamp: string;
  missed: boolean;
  incoming: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

export interface UserProfile {
  displayName: string;
  status: string;
  phone: string;
  avatar: string;
  security: boolean;
}

export interface ActiveCall {
  contact: Contact;
  type: 'voice' | 'video';
}

// Props Interfaces
export interface SplashScreenProps {
  onComplete: () => void;
}

export interface OTPScreenProps {
  onVerified: (phone: string) => void;
}

export interface ProfileSetupProps {
  phone: string;
  onComplete: (profile: UserProfile) => void;
}

export interface ChatListPageProps {
  profile: UserProfile | null;
  onSelectChat: (conversation: Conversation, contact: Contact) => void;
  onNavigate: (screen: string) => void;
}

export interface ChatInterfaceProps {
  conversation: Conversation | null;
  contact: Contact | null;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export interface ContactsPageProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onStartChat: (contact: Contact) => void;
  onStartCall: (contact: Contact, type: 'voice' | 'video') => void;
}

export interface CallsPageProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onStartCall: (contact: Contact, type: 'voice' | 'video') => void;
}

export interface SettingsPageProps {
  profile: UserProfile | null;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onUpdateProfile: (profile: UserProfile) => void;
}