import React from 'react';
import { Lock, Shield, CheckCircle } from 'lucide-react';

interface SecurityBadgeProps {
  type?: 'lock' | 'shield' | 'check';
  message: string;
  subMessage?: string;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ type = 'lock', message, subMessage }) => {
  const getIcon = () => {
    switch (type) {
      case 'shield':
        return <Shield size={20} className="text-green-600" />;
      case 'check':
        return <CheckCircle size={20} className="text-black" />;
      default:
        return <Lock size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-gray-100 text-gray-700 text-xs p-3 text-center font-light">
      <div className="flex items-center justify-center gap-2">
        {getIcon()}
        <div>
          <span>{message}</span>
          {subMessage && <span className="block text-xs text-gray-600">{subMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;