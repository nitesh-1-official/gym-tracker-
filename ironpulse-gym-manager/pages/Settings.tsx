import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage gym configuration</p>
      </div>

      <div className="bg-gym-800 border border-gym-700 rounded-xl p-6 shadow-lg max-w-2xl">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2 text-gym-accent" />
          General Configuration
        </h3>

        <div className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">Gym Name</label>
             <input type="text" value="IronPulse Gym" disabled className="w-full px-4 py-2 bg-gym-900 border border-gym-700 rounded-lg text-slate-500 cursor-not-allowed" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gym-900 rounded-lg border border-gym-700">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-sm text-slate-400">Always active</p>
            </div>
            <div className="w-10 h-6 bg-gym-accent rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gym-900 rounded-lg border border-gym-700">
            <div>
              <p className="text-white font-medium">Automated Alerts</p>
              <p className="text-sm text-slate-400">Send automatic emails on expiry</p>
            </div>
             <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="px-4 py-2 bg-gym-accent text-white rounded-lg hover:bg-gym-accentHover flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;