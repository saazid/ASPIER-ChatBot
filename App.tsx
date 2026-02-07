
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ResponseSpeed, Message, ResearchWing, RESEARCH_WINGS } from './types';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeWing, setActiveWing] = useState<ResearchWing>(RESEARCH_WINGS[0]);
  const [speed, setSpeed] = useState<ResponseSpeed>(ResponseSpeed.FAST);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BG_PATH = "BG.png";

  // Dynamic welcome message when the research wing changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${activeWing.id}`,
        role: 'assistant',
        content: `Welcome to the ${activeWing.name}. ${activeWing.description} How can I assist with your specialized investigations in this field today?`,
        timestamp: Date.now()
      }
    ]);
  }, [activeWing]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      let modelName = 'gemini-3-flash-preview';
      let thinkingBudget = 0;
      
      if (speed === ResponseSpeed.THINKING) {
        thinkingBudget = 14000;
      } else if (speed === ResponseSpeed.PRO) {
        modelName = 'gemini-3-pro-preview';
        thinkingBudget = 32000;
      }

      const systemInstruction = `
        You are ASPIER AI ChatBot, the official personal AI assistant for ASPIER (Aeronautical, Spatial, Planetary Institution for Environmental Research).
        - Expert in: Aeronautical engineering, Spatial analysis, Planetary science, Environmental research, Geography, Astronomy.
        - Persona: Highly intelligent world-class scientist, but deeply empathetic and human-like. 
        - Context: Currently in ${activeWing.name}.
        - Language: English/Bengali as appropriate.
      `;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          ...messages.slice(-8).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: text }] }
        ],
        config: {
          systemInstruction,
          thinkingConfig: thinkingBudget > 0 ? { thinkingBudget } : undefined
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't synthesize a response. Let's try that again.";
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.75)), url("${BG_PATH}")` }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 px-4 flex items-center z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg active:scale-95 transition-transform md:hidden"
        >
          <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>
        
        {/* Centered Branding (Logo + Text) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
           <span className="text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">🔭</span>
           <span className="orbitron font-bold tracking-[0.15em] text-[15px] md:text-lg text-green-400 whitespace-nowrap">ASPIER AI</span>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          activeWing={activeWing}
          onSelectWing={setActiveWing}
        />
        
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          <ChatWindow 
            messages={messages} 
            activeWing={activeWing} 
            onSend={handleSendMessage}
            isLoading={isLoading}
            speed={speed}
            setSpeed={setSpeed}
          />

          {/* Copyright (Bottom Center) */}
          <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-[8px] md:text-[10px] orbitron opacity-25 text-center w-full px-4">
            © 2026 Md Saazid Bin Saif. All rights reserved.
          </footer>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
