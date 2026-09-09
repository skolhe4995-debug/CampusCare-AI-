import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw, PhoneCall, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  disclaimer?: string;
  timestamp: string;
}

interface AIAssistantProps {
  language: Language;
  onOpenEmergency: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ language, onOpenEmergency }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: language === 'hi' 
        ? "नमस्ते! मैं कैंपसकेयर एआई स्वास्थ्य सहायक हूँ। आप मुझसे स्वच्छता, पोषण, प्राथमिक चिकित्सा या स्वस्थ रहने के बारे में कोई भी प्रश्न पूछ सकते हैं।"
        : language === 'mr'
        ? "नमस्कार! मी कॅम्पसकेअर एआय आरोग्य सहाय्यक आहे. आपण मला स्वच्छता, पोषण, प्रथमोपचार किंवा आरोग्यदायी राहण्याबद्दल कोणताही प्रश्न विचारू शकता."
        : "Hello! I am your CampusCare AI Health & Hygiene Assistant. Ask me anything about personal hygiene, nutrition, staying healthy at school, or basic first-aid guidance!",
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const promptSuggestions = [
    "I have a headache. What should I do?",
    "How can I prevent getting the flu at school?",
    "Why is handwashing with soap so important?",
    "What are some quick healthy lunchbox ideas?",
    "How can I manage exam stress before a test?",
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend, language }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || "Thank you for asking! Always remember to drink clean water and inform your teacher if you are feeling unwell.",
        disclaimer: data.disclaimer || "Always inform a school nurse or teacher if you are feeling sick.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Assistant request error", err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I am here to guide you! Drink plenty of water, rest, and make sure to tell your class teacher or visit the school nurse if you are experiencing pain, fever, or discomfort.",
        disclaimer: "Always consult the school nurse for health concerns.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-8">
      
      {/* Header Banner - High Density */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm flex items-center justify-between">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-emerald-300 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Server-Side Gemini AI Powered</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">{t.aiAssistant}</h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Safe, educational health guidance for students. Always consult the school nurse for medical needs.
          </p>
        </div>

        <button
          onClick={onOpenEmergency}
          className="hidden sm:flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md font-bold text-xs shadow-2xs transition-all cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Need Nurse Now</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-[540px]">
        
        {/* Chat Thread */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
              </div>

              <div
                className={`max-w-[85%] p-3 rounded-md text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white font-medium'
                    : 'bg-white border border-slate-200/90 text-slate-900 shadow-2xs space-y-1.5'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.disclaimer && msg.sender === 'ai' && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-start space-x-1.5 text-[11px] font-semibold text-amber-900 bg-amber-50/90 p-2 rounded-md border border-amber-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}

                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-600 text-xs font-semibold p-1.5">
              <div className="w-7 h-7 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>CampusCare AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-slate-200/80 overflow-x-auto flex space-x-1.5">
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border border-slate-300/80 shrink-0 cursor-pointer disabled:opacity-50"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask a health or hygiene question (e.g., 'What to do for a sprained ankle?')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-medium outline-hidden focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-2.5 rounded-md font-bold transition-all shadow-2xs cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
