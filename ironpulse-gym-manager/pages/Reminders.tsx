import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, RefreshCw } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants.ts';
import { generateRenewalReminder } from '../services/geminiService.ts';
import { Member } from '../types.ts';

const Reminders: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter only members who are expired or expiring soon for the dropdown
  const relevantMembers = MOCK_MEMBERS.filter(m => {
    const daysLeft = Math.ceil((new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return daysLeft <= 14; // Include expired and expiring in 2 weeks
  });

  const handleGenerate = async () => {
    if (!selectedMemberId) return;
    
    const member = MOCK_MEMBERS.find(m => m.id === selectedMemberId);
    if (!member) return;

    setIsLoading(true);
    setGeneratedMessage('');

    const daysLeft = Math.ceil((new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    try {
      const message = await generateRenewalReminder(
        member.fullName,
        daysLeft,
        `${member.planDuration} Month`
      );
      setGeneratedMessage(message);
    } catch (error) {
      console.error(error);
      setGeneratedMessage("Failed to generate message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-gym-accent" />
          AI Reminder Generator
        </h1>
        <p className="text-slate-400">
          Select a member to automatically generate a personalized, professional renewal reminder using Gemini AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Selection Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gym-800 p-6 rounded-xl border border-gym-700 shadow-lg">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Member</label>
            <select 
              className="w-full bg-gym-900 border border-gym-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-gym-accent focus:border-transparent"
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value);
                setGeneratedMessage('');
              }}
            >
              <option value="">-- Choose Member --</option>
              {relevantMembers.map(m => {
                 const daysLeft = Math.ceil((new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                 return (
                   <option key={m.id} value={m.id}>
                     {m.fullName} ({daysLeft < 0 ? `Expired ${Math.abs(daysLeft)}d ago` : `Expires in ${daysLeft}d`})
                   </option>
                 );
              })}
            </select>
            
            <div className="mt-6">
              <button
                disabled={!selectedMemberId || isLoading}
                onClick={handleGenerate}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                  !selectedMemberId || isLoading
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-gym-accent text-white hover:bg-gym-accentHover shadow-lg shadow-gym-accent/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="md:col-span-2">
          <div className="bg-gym-800 p-6 rounded-xl border border-gym-700 shadow-lg h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-slate-400" />
              Message Preview
            </h3>
            
            <div className="flex-1 bg-gym-900 rounded-lg p-4 border border-gym-700 relative min-h-[200px]">
              {generatedMessage ? (
                <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{generatedMessage}</p>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                  <p>Select a member and click Generate to see the AI magic.</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                disabled={!generatedMessage}
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Copy Text
              </button>
              <button
                disabled={!generatedMessage}
                onClick={() => alert("In a real app, this would open WhatsApp Web!")}
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;