import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm, ContactFormData } from '../services/contact';

const STORAGE_KEY = 'collabyt_lead_token';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const initialMessages: ChatMessage[] = [
  {
    role: 'model',
    text: 'Ola! Sou a IA da Collaby.t. Posso fazer uma analise tecnica preliminar da sua ideia agora mesmo. O que voce quer construir?'
  }
];

const initialLeadForm: ContactFormData = {
  name: '',
  email: '',
  challenge: '',
  message: '',
  consent: false,
};

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadToken, setLeadToken] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState<ContactFormData>(initialLeadForm);
  const [leadError, setLeadError] = useState('');
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLeadToken(stored);
    } catch {
      // ignore
    }
  }, []);

  // Trigger pro-active teaser after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTeaser(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShowTeaser(false);
  };

  const clearLeadToken = () => {
    setLeadToken(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const updateLastModelMessage = (text: string) => {
    setMessages((prev) => {
      const next = [...prev];
      if (next.length && next[next.length - 1].role === 'model') {
        next[next.length - 1] = { role: 'model', text };
        return next;
      }
      return [...next, { role: 'model', text }];
    });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    if (!leadToken) {
      updateLastModelMessage('Para continuar, precisamos do seu contato.');
      return;
    }

    const userText = inputValue;
    const userMessage: ChatMessage = { role: 'user', text: userText };
    const history = messages
      .filter((msg) => msg.text.trim())
      .slice(-8)
      .map((msg) => ({ role: msg.role, text: msg.text }));

    setMessages((prev) => [...prev, userMessage, { role: 'model', text: '' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadToken,
          message: userText,
          history,
        }),
      });

      if (response.status === 401) {
        clearLeadToken();
        updateLastModelMessage('Para continuar, precisamos do seu contato.');
        return;
      }

      if (response.status === 429) {
        updateLastModelMessage('Limite diario atingido. Vamos continuar amanha ou fale com um especialista.');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao consultar a IA');
      }

      const data = await response.json();
      const reply = typeof data.reply === 'string' ? data.reply : 'Nao consegui responder agora.';
      updateLastModelMessage(reply);
    } catch (error) {
      console.error('AI Error:', error);
      updateLastModelMessage('Meus sistemas encontraram uma barreira inesperada. Poderia reformular?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLeadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setLeadForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!leadForm.name || !leadForm.email) {
      setLeadError('Nome e email sao obrigatorios.');
      return;
    }

    if (!leadForm.consent) {
      setLeadError('Voce precisa aceitar o consentimento.');
      return;
    }

    setIsLeadSubmitting(true);

    try {
      const payload: ContactFormData = {
        ...leadForm,
        message: leadForm.message || 'Lead capturado via Architect AI.',
      };
      const response = await submitContactForm(payload);

      if (!response.leadToken) {
        throw new Error('Token de lead nao retornado');
      }

      setLeadToken(response.leadToken);
      setMessages(initialMessages);
      setLeadForm(initialLeadForm);
      try {
        window.localStorage.setItem(STORAGE_KEY, response.leadToken);
      } catch {
        // ignore
      }
    } catch (error) {
      console.error('Lead error:', error);
      setLeadError('Nao foi possivel validar seu contato. Tente novamente.');
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        {/* Proactive Teaser Bubble */}
        <AnimatePresence>
          {showTeaser && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white text-brandBlack px-5 py-3 rounded-2xl rounded-tr-sm shadow-xl border border-white/20 relative max-w-[250px] cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={handleOpen}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="absolute -top-2 -left-2 bg-brandGray text-slate-400 rounded-full p-0.5 hover:text-white border border-white/10"
              >
                <X size={12} />
              </button>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
                <div>
                  <p className="font-bold text-sm mb-1">Ideia parada?</p>
                  <p className="text-xs text-slate-600 leading-snug">
                    Posso fazer uma analise tecnica rapida do seu projeto agora.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`pointer-events-auto p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 relative group overflow-hidden ${
            isOpen ? 'bg-brandGray text-white border border-white/20' : 'bg-brandOrange text-white'
          }`}
        >
          {/* Pulse effect when teaser is active */}
          {showTeaser && !isOpen && (
            <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-20"></span>
          )}

          <div className="relative z-10 flex items-center gap-2">
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            {!isOpen && <span className="hidden md:inline font-bold pr-1">Diagnostico IA</span>}
          </div>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[550px] max-h-[80vh] bg-brandGray/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brandOrange to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Architect AI</h3>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1.5 uppercase tracking-wider font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMessages([{ role: 'model', text: 'Reiniciando... Ola! Como posso ajudar?' }])}
                  className="text-slate-500 hover:text-white transition-colors text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10"
                >
                  Limpar
                </button>
              </div>
            </div>

            {!leadToken ? (
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20">
                <div className="bg-brandBlack/60 border border-white/10 rounded-2xl p-4 text-slate-200">
                  <p className="text-sm text-slate-300">
                    Para liberar o Architect AI, deixe seu contato. Vamos usar esses dados apenas para te ajudar.
                  </p>

                  <form onSubmit={handleLeadSubmit} className="mt-4 space-y-3">
                    <div>
                      <label className="text-xs text-slate-400">Nome</label>
                      <input
                        type="text"
                        name="name"
                        value={leadForm.name}
                        onChange={handleLeadChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-white/10 text-white text-sm focus:ring-1 focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={leadForm.email}
                        onChange={handleLeadChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-white/10 text-white text-sm focus:ring-1 focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Desafio</label>
                      <input
                        type="text"
                        name="challenge"
                        value={leadForm.challenge}
                        onChange={handleLeadChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-white/10 text-white text-sm focus:ring-1 focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="Ex: MVP, IA aplicada, legado"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Mensagem (opcional)</label>
                      <textarea
                        name="message"
                        value={leadForm.message}
                        onChange={handleLeadChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-white/10 text-white text-sm focus:ring-1 focus:ring-brandOrange focus:border-brandOrange"
                        rows={3}
                        placeholder="Conte um pouco sobre o projeto"
                      />
                    </div>
                    <label className="flex items-start gap-2 text-xs text-slate-400">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={leadForm.consent}
                        onChange={handleLeadChange}
                        className="mt-0.5 h-4 w-4 rounded border border-slate-500 bg-brandBlack checked:border-brandOrange checked:bg-brandOrange"
                        required
                      />
                      <span>Autorizo o contato da Collaby.t para este diagnostico.</span>
                    </label>
                    {leadError ? <p className="text-xs text-rose-400">{leadError}</p> : null}
                    <button
                      type="submit"
                      disabled={isLeadSubmitting}
                      className="w-full mt-2 bg-brandOrange hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-brandOrange/20 disabled:opacity-60"
                    >
                      {isLeadSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Liberar Architect AI'}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-black/20">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                          msg.role === 'user'
                            ? 'bg-slate-800 border border-white/10'
                            : 'bg-brandBlack border border-brandOrange/30'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <User size={14} className="text-slate-300" />
                        ) : (
                          <Bot size={14} className="text-brandOrange" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 max-w-[85%]">
                        <div
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-md backdrop-blur-sm whitespace-pre-wrap ${
                            msg.role === 'user'
                              ? 'bg-slate-800/80 text-white border border-white/10 rounded-tr-none'
                              : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.role === 'model' && idx === messages.length - 1 && !isLoading && (
                          <span className="text-[10px] text-slate-600 ml-1">Architect AI • Agora</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-slate-500 text-xs pl-12"
                    >
                      <Loader2 className="w-3 h-3 animate-spin text-brandOrange" />
                      <span className="animate-pulse">Digitando...</span>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-brandBlack/50 backdrop-blur-md border-t border-white/5">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Descreva seu desafio..."
                      disabled={isLoading}
                      className="w-full bg-brandGray border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brandOrange/50 focus:ring-1 focus:ring-brandOrange/50 transition-all shadow-inner"
                      autoFocus
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !inputValue.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-brandOrange rounded-lg text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg shadow-brandOrange/20"
                    >
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                  </div>
                  <div className="text-center mt-3 flex justify-center items-center gap-1.5 opacity-60">
                    <ShieldCheck size={10} className="text-brandOrange" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                      Lead validado. Limite diario aplicado.
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConsultant;
