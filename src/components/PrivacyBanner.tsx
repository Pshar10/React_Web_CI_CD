import React, { useState, useEffect } from 'react';
import { Shield, X, Settings } from 'lucide-react';
import { useAnalyticsContext } from './AnalyticsProvider';

const PrivacyBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { isEnabled, toggleTracking } = useAnalyticsContext();

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('privacy_banner_seen');
    if (!hasSeenBanner) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('privacy_banner_seen', 'true');
    setShowBanner(false);
  };

  const showPrivacySettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const saveSettings = () => {
    localStorage.setItem('privacy_banner_seen', 'true');
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Privacy Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-400 flex-shrink-0" size={24} />
              <div>
                <p className="text-white font-medium">Privacy & Analytics</p>
                <p className="text-gray-300 text-sm">
                  This site uses analytics to improve user experience. No personal data is collected.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={showPrivacySettings}
                className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg transition-colors"
              >
                Settings
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Privacy Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Analytics Tracking</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Helps us understand how visitors interact with the website to improve user experience.
                </p>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={toggleTracking}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-white">Enable analytics tracking</span>
                </label>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium text-white mb-2">What we collect:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Page views and section interactions</li>
                  <li>• Device type and browser information</li>
                  <li>• Performance metrics (load times)</li>
                  <li>• Error tracking for debugging</li>
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium text-white mb-2">What we don't collect:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Personal information (name, email, etc.)</li>
                  <li>• IP addresses or location data</li>
                  <li>• Cookies or persistent identifiers</li>
                  <li>• Any data shared with third parties</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyBanner;