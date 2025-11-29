import React, { useState, useEffect } from 'react';

interface InstallPromptProps {
  onInstall: () => Promise<boolean>;
  onDismiss: () => void;
  isInstallable: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ 
  onInstall, 
  onDismiss, 
  isInstallable 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem('pwaPromptDismissed');
    const dismissedTime = localStorage.getItem('pwaPromptDismissedTime');
    
    if (dismissedTime) {
      const now = new Date().getTime();
      const dismissedDate = parseInt(dismissedTime);
      const daysSinceDismissal = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismissal > 7) {
        localStorage.removeItem('pwaPromptDismissed');
        localStorage.removeItem('pwaPromptDismissedTime');
        setDismissed(false);
      }
    }

    if (isInstallable && !dismissed && !wasDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, dismissed]);

  const handleInstall = async (): Promise<void> => {
    const installed = await onInstall();
    if (installed) {
      setIsVisible(false);
    }
  };

  const handleDismiss = (): void => {
    setIsVisible(false);
    setDismissed(true);
    onDismiss();
    localStorage.setItem('pwaPromptDismissed', 'true');
    localStorage.setItem('pwaPromptDismissedTime', new Date().getTime().toString());
  };

  const handleClose = (): void => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-slideUp">
        {/* Header */}
        <div className="relative p-6">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light bg-transparent border-none cursor-pointer"
          >
            ×
          </button>
          
          {/* Content */}
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className="shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            
            {/* Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Install Our App
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get the full experience! Install our app to your home screen for quick access and better performance.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <div className="flex space-x-3 mb-3">
            <button
              onClick={handleInstall}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Install Now
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-gray-300"
            >
              Later
            </button>
          </div>
          
          {/* Hint */}
          <div className="text-center border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-500">
              Look for <span className="font-medium">"Add to Home Screen"</span> in your browser menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;