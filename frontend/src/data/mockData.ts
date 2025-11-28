import type { Contact, Conversation, CallHistory } from '../types';

export const mockContacts: Contact[] = [
  { id: 1, name: 'Raj Sharma', status: 'online', lastSeen: '2 min ago', avatar: '👨', phone: '+91 98765 43210', isContact: true },
  { id: 2, name: 'Priya Patel', status: 'offline', lastSeen: '1 hour ago', avatar: '👩', phone: '+91 87654 32109', isContact: true },
  { id: 3, name: 'Amit Kumar', status: 'online', lastSeen: '5 min ago', avatar: '👨', phone: '+91 76543 21098', isContact: true },
  { id: 4, name: 'Neha Gupta', status: 'online', lastSeen: 'now', avatar: '👩', phone: '+91 65432 10987', isContact: true },
  { id: 5, name: 'Sanjay Singh', status: 'away', lastSeen: '30 min ago', avatar: '👨', phone: '+91 94321 09876', isContact: true },
  { id: 6, name: 'Anjali Mehta', status: 'online', lastSeen: '10 min ago', avatar: '👩', phone: '+91 83210 98765', isContact: true },
  { id: 7, name: 'Vikram Joshi', status: 'offline', lastSeen: '2 hours ago', avatar: '👨', phone: '+91 72109 87654', isContact: true },
  { id: 8, name: 'Sneha Reddy', status: 'online', lastSeen: 'just now', avatar: '👩', phone: '+91 61098 76543', isContact: true },
  { id: 9, name: 'Rahul Verma', status: 'away', lastSeen: '45 min ago', avatar: '👨', phone: '+91 50987 65432', isContact: true },
  { id: 10, name: 'Pooja Mishra', status: 'online', lastSeen: '3 min ago', avatar: '👩', phone: '+91 49876 54321', isContact: true },
  { id: 11, name: 'Arun Desai', status: 'offline', lastSeen: '5 hours ago', avatar: '👨', phone: '+91 38765 43210', isContact: false },
  { id: 12, name: 'Kavita Nair', status: 'online', lastSeen: '1 min ago', avatar: '👩', phone: '+91 27654 32109', isContact: false },
  { id: 13, name: 'Deepak Iyer', status: 'away', lastSeen: '20 min ago', avatar: '👨', phone: '+91 16543 21098', isContact: false },
  { id: 14, name: 'Meera Choudhary', status: 'online', lastSeen: 'just now', avatar: '👩', phone: '+91 95432 10987', isContact: false },
  { id: 15, name: 'Suresh Menon', status: 'offline', lastSeen: '1 day ago', avatar: '👨', phone: '+91 84321 09876', isContact: false },
];

export const mockConversations: Conversation[] = [
  { id: 1, contactId: 1, lastMessage: 'Meeting at 3 PM tomorrow?', timestamp: '2:30 PM', unread: 2, encrypted: true, pinned: false, muted: false },
  { id: 2, contactId: 2, lastMessage: 'Thanks for the documents!', timestamp: '1:15 PM', unread: 0, encrypted: true, pinned: false, muted: false },
  { id: 3, contactId: 3, lastMessage: 'Let\'s catch up this weekend', timestamp: 'Yesterday', unread: 5, encrypted: true, pinned: true, muted: false },
  { id: 4, contactId: 4, lastMessage: 'Dinner tonight?', timestamp: '11:45 AM', unread: 1, encrypted: true, pinned: false, muted: true },
  { id: 5, contactId: 5, lastMessage: 'Project completed successfully', timestamp: '10:20 AM', unread: 0, encrypted: true, pinned: false, muted: false },
  { id: 6, contactId: 6, lastMessage: 'Call me when you\'re free', timestamp: 'Yesterday', unread: 3, encrypted: true, pinned: false, muted: false },
];

export const mockCallHistory: CallHistory[] = [
  { id: 1, contactId: 1, type: 'voice', duration: '2:45', timestamp: '3:30 PM', missed: false, incoming: false },
  { id: 2, contactId: 2, type: 'voice', duration: '0:00', timestamp: '2:15 PM', missed: true, incoming: true },
  { id: 3, contactId: 3, type: 'video', duration: '5:20', timestamp: 'Yesterday', missed: false, incoming: true },
  { id: 4, contactId: 4, type: 'video', duration: '12:10', timestamp: '2 days ago', missed: false, incoming: false },
  { id: 5, contactId: 5, type: 'voice', duration: '1:30', timestamp: '2 days ago', missed: true, incoming: true },
  { id: 6, contactId: 6, type: 'voice', duration: '3:15', timestamp: '3 days ago', missed: false, incoming: false },
  { id: 7, contactId: 7, type: 'video', duration: '7:45', timestamp: '4 days ago', missed: false, incoming: true },
];

export const getContactById = (id: number): Contact | undefined => {
  return mockContacts.find(contact => contact.id === id);
};

export const getConversationByContactId = (contactId: number): Conversation | undefined => {
  return mockConversations.find(conv => conv.contactId === contactId);
};