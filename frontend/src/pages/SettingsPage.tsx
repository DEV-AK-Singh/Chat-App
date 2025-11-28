import React, { useState } from 'react';
import { 
  Edit, Bell, Lock, CheckCircle2, HelpCircle, Info, LogOut, Shield, 
  Eye, EyeOff, User, Phone, Download, 
  ChevronRight
} from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import SecurityBadge from '../components/common/SecurityBadge';
import type { SettingsPageProps, UserProfile } from '../types';

const SettingsPage: React.FC<SettingsPageProps> = ({ profile, onBack, onLogout, onUpdateProfile, onNavigate }) => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [security, setSecurity] = useState<boolean>(true);
  const [readReceipts, setReadReceipts] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<UserProfile>(profile || {
    displayName: 'User',
    status: 'Hey there! I am using DAMRU',
    phone: '+91 ',
    avatar: '👤',
    security: true
  });

  const handleSaveProfile = () => {
    onUpdateProfile(editProfile);
    setIsEditing(false);
  };

  const handleHelpSupport = () => {
    alert('Help & Support: Contact us at support@damru.com or call +91 1800-123-4567');
  };

  const handleAbout = () => {
    alert('DAMRU v1.0.0\nSecure Messaging App\nEnd-to-End Encrypted\nBuilt with React & TypeScript');
  };

  const handleExportData = () => {
    alert('Data export started... This may take a few minutes.');
  };

  if (!profile) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p>No profile data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header 
        title="Settings" 
        showBack 
        onBack={onBack} 
      />

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              {editProfile.avatar}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editProfile.displayName}
                    onChange={(e) => setEditProfile({...editProfile, displayName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="text"
                    value={editProfile.status}
                    onChange={(e) => setEditProfile({...editProfile, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveProfile}
                      className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-gray-900">{profile.displayName}</h2>
                  <p className="text-sm font-light text-gray-600">{profile.status}</p>
                  <p className="text-xs font-light text-gray-500 mt-1">{profile.phone}</p>
                </>
              )}
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <SecurityBadge 
          type="shield" 
          message="Security Protected" 
          subMessage="End-to-end encryption active" 
        />

        {/* Settings Options */}
        <div className="space-y-1">
          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-xs font-light text-gray-600">Manage your notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`p-1 rounded-full w-12 transition ${notifications ? 'bg-black' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Privacy & Security</p>
                <p className="text-xs font-light text-gray-600">End-to-end encryption settings</p>
              </div>
            </div>
            <button
              onClick={() => setSecurity(!security)}
              className={`p-1 rounded-full w-12 transition ${security ? 'bg-black' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${security ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle2 size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Read Receipts</p>
                <p className="text-xs font-light text-gray-600">Show when messages are read</p>
              </div>
            </div>
            <button
              onClick={() => setReadReceipts(!readReceipts)}
              className={`p-1 rounded-full w-12 transition ${readReceipts ? 'bg-black' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${readReceipts ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Download size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Export Data</p>
                <p className="text-xs font-light text-gray-600">Download your chat history</p>
              </div>
            </div>
            <button onClick={handleExportData}>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <HelpCircle size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Help & Support</p>
                <p className="text-xs font-light text-gray-600">Get help with DAMRU</p>
              </div>
            </div>
            <button onClick={handleHelpSupport}>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Info size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">About DAMRU</p>
                <p className="text-xs font-light text-gray-600">Version 1.0.0</p>
              </div>
            </div>
            <button onClick={handleAbout}>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={onLogout}
            className="w-full p-4 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>

      <BottomNavigation currentScreen="settings" onNavigate={onNavigate} />
    </div>
  );
};

export default SettingsPage;