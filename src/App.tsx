/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Send, 
  PartyPopper, 
  Map as MapIcon,
  MessageSquare,
  Gift,
  Heart,
  ChevronRight,
  Smile,
  ShieldCheck
} from 'lucide-react';

// Informações do evento
const EVENT_INFO = {
  name: "ALÉXIA",
  date: new Date("2026-05-09T18:00:00"),
  location: "Casa da Bruna",
  address: "Av Estrela do Sul, 662, bairro Martins, Uberlândia - MG, CEP 38400-339",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Av+Estrela+do+Sul+662+Uberlândia",
  contacts: [
    { name: "Bruna", link: "https://wa.me/55556492399739" },
    { name: "Marina", link: "http://wa.me/5534984186829" }
  ]
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0, 
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    attending: 'sim',
    guests: 1,
    message: '',
    contact: 'Bruna'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = EVENT_INFO.date.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedContact = EVENT_INFO.contacts.find(c => c.name === formData.contact);
    const waBaseUrl = selectedContact?.link || EVENT_INFO.contacts[0].link;
    
    const text = `Confirmação de presença para o aniversário da ALÉXIA!
 Nome: ${formData.name}
Presença: ${formData.attending === 'sim' ? 'Sim, eu vou!' : 'Não poderei ir, mas boa festa!'}
Quantidade de pessoas: ${formData.guests}
Mensagem: ${formData.message || 'Sem mensagem adicional.'}`;

    const encodedText = encodeURIComponent(text);

    window.location.href = `${waBaseUrl}?text=${encodedText}`;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary/30 font-sans bg-brand-soft">
      {/* Alerta de surpresa */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-gradient-to-r from-pink-500 via-[#A47DAB] to-pink-500 text-white px-4 py-2 rounded-full shadow-lg font-black flex items-center justify-center gap-2 text-sm"
      >
        <span>🤫 SURPRESA! Não conte!</span>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-6 pt-28 md:pt-20">
        {/* Background Shapes */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-secondary rounded-full blur-[100px]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 text-center max-w-3xl"
        >
          {/* SURPRESA Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-pink-500 via-[#A47DAB] to-pink-500 text-white px-8 py-3 rounded-2xl shadow-xl font-black text-lg inline-flex items-center gap-3"
          >
            <span>🤫</span>
            <span>SURPRESA! Não conte para a ALÉXIA!</span>
          </motion.div>

          <div className="relative inline-block mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-56 h-56 md:w-72 md:h-72 bg-white p-4 rounded-3xl shadow-2xl relative z-10 overflow-hidden ring-8 ring-brand-primary/5"
            >
              <img 
                src="/bem.png" 
                alt="ALÉXIA" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-10 z-20 bg-brand-accent text-slate-900 px-4 py-2 rounded-2xl shadow-xl font-black text-sm flex items-center gap-2 border-2 border-white rotate-12"
            >
              <PartyPopper className="w-4 h-4" /> VAI TER BOLO!
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -left-12 z-20 bg-white text-brand-primary px-4 py-2 rounded-2xl shadow-xl font-black text-sm flex items-center gap-2 border-2 border-brand-primary/10 -rotate-12"
            >
              <Heart className="w-4 h-4 fill-brand-primary text-brand-primary" /> ALÉXIA
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8 text-brand-dark tracking-tight">
            OFICIALMENTE <span className="text-brand-primary">CONVOCADO(A)</span> PARA A FESTA! 🎉
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-10 font-medium max-w-xl mx-auto leading-relaxed">
            Prepare-se para uma noite de <span className="text-brand-primary border-b-2 border-brand-accent">comemoração épica</span> e muitas risadas!
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.a 
              href="#confirmar"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-brand-primary text-white rounded-full font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center gap-3 transition-all"
            >
              Confirmar Presença <ChevronRight className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl md:text-5xl pointer-events-none select-none"
              initial={{ x: Math.random() * 100 + "%", y: "-10vh", rotate: Math.random() * 360 }}
              animate={{ y: ["0vh", "110vh"], rotate: [0, 360] }}
              transition={{ duration: 12 + Math.random() * 20, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            >
              {['✨', '💜', '🎂', '🥳', '🎁', '🥂', '🕺', '💃'][i % 8]}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Countdown */}
      <section className="py-32 bg-brand-soft px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-black tracking-widest mb-6"
          >
            CONTAGEM REGRESSIVA
          </motion.div>
          <h2 className="text-4xl font-display font-black mb-16 text-brand-dark">A festa começa em:</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-primary/5 flex flex-col items-center justify-center border-b-4 border-brand-primary"
              >
                <div className="text-4xl md:text-6xl font-display font-black text-brand-dark leading-none">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-brand-primary mt-4">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-6 bg-white p-12 rounded-[3.5rem] shadow-xl shadow-brand-primary/5 flex flex-col justify-between border border-brand-primary/5 transition-all min-h-[340px]"
            >
              <div className="bg-brand-primary/10 text-brand-primary w-16 h-16 rounded-3xl flex items-center justify-center mb-10">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-4xl font-display font-black text-brand-dark mb-4 tracking-tight">Quando?</h3>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                  Sábado, <span className="font-black text-brand-primary">09 de Maio</span><br />
                  Às <span className="font-black text-brand-dark">18:00h</span> em ponto!
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="md:col-span-6 bg-[#1A1A1A] p-8 md:p-14 rounded-[4rem] text-white overflow-hidden relative group min-h-[400px] flex flex-col border border-white/5 active:scale-[0.98] transition-all"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <div className="bg-brand-primary/20 backdrop-blur-xl w-16 h-16 rounded-[1.5rem] flex items-center justify-center border border-white/10">
                    <MapPin className="text-brand-primary w-8 h-8" />
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 text-[10px] uppercase font-black tracking-widest text-brand-primary">
                    LOCALIZADO NO MARTINS
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl font-display font-black mb-6 tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Onde vai ser?
                  </h3>
                  <div className="space-y-4">
                    <p className="text-brand-primary font-black text-2xl md:text-3xl flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                      {EVENT_INFO.location}
                    </p>
                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                      {EVENT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  <motion.a 
                    href={EVENT_INFO.mapsLink} 
                    target="_blank" 
                    rel="no-referrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-brand-primary px-8 py-5 rounded-[2rem] font-black text-lg transition-all shadow-[0_10px_40px_rgba(164,125,171,0.3)]"
                  >
                    Abrir no Maps <MapIcon className="w-6 h-6" />
                  </motion.a>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(EVENT_INFO.address);
                      alert('Endereço copiado! 🚀');
                    }}
                    className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-[2rem] font-black text-lg transition-all"
                  >
                    Copiar <ChevronRight className="w-5 h-5 opacity-50" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ rotate: 1 }}
              className="md:col-span-7 bg-brand-accent p-12 rounded-[3.5rem] border-4 border-brand-dark shadow-[15px_15px_0px_0px_rgba(50,38,53,1)] flex flex-col justify-center items-center text-center relative min-h-[280px]"
            >
              <div className="absolute -top-5 -left-5 bg-brand-dark text-white px-6 py-2 font-black italic rounded-xl text-sm tracking-widest">IMPORTANTE</div>
              <h3 className="text-3xl font-display font-black text-brand-dark mb-6 leading-tight uppercase italic">
                "Sua presença vale mais que presente... <br/>
                <span className="text-xl opacity-75">(mas presente é bem-vindo 😄)</span>"
              </h3>
              <p className="text-brand-dark/80 font-black italic max-w-md">
                Prometemos comida farta, risadas altas e lembranças inesquecíveis! Traga seu melhor humor.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-5 bg-white p-12 rounded-[3.5rem] shadow-xl shadow-brand-primary/5 flex flex-col justify-center gap-6 border border-brand-primary/5 min-h-[280px]"
            >
              <div className="flex items-center gap-4">
                <div className="text-6xl animate-bounce">🤫</div>
                <div>
                  <h3 className="text-2xl font-display font-black text-[#A47DAB] mb-2">BICO CALADO! É DA SURPRESA</h3>
                  <p className="text-slate-500 font-bold leading-relaxed text-lg">
                    A ALÉXIA não pode saber de NADA até o momento do "SURPRESA!"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="confirmar" className="py-32 px-6 bg-brand-soft">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-dark mb-6">Confirmar?</h2>
            <p className="text-slate-500 text-lg font-medium">Não deixe para a última hora, Bruna e Marina estão ansiosos!</p>
          </div>

          <motion.form 
            onSubmit={handleRSVP}
            className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl shadow-brand-primary/10 border-2 border-brand-primary/10 space-y-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary ml-1 block">Qual seu belo nome?</label>
              <input 
                required
                type="text" 
                placeholder="Seu nome completo"
                className="w-full bg-brand-soft border-2 border-transparent rounded-3xl p-6 outline-none focus:border-brand-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className={`p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-3 ${formData.attending === 'sim' ? 'bg-brand-primary text-white border-brand-primary shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-300 hover:border-brand-primary/20'}`}
                onClick={() => setFormData({...formData, attending: 'sim'})}
              >
                <div className="text-4xl">🥳</div>
                <div className="font-black text-sm uppercase tracking-wider">Tô dentro!</div>
              </button>
              <button 
                type="button"
                className={`p-8 rounded-[3rem] border-4 transition-all flex flex-col items-center gap-3 ${formData.attending === 'nao' ? 'bg-brand-dark text-white border-brand-dark shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-300 hover:border-brand-primary/20'}`}
                onClick={() => setFormData({...formData, attending: 'nao'})}
              >
                <div className="text-4xl">😿</div>
                <div className="font-black text-sm uppercase tracking-wider">Não poderei ir</div>
              </button>
            </div>

            <AnimatePresence>
              {formData.attending === 'sim' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden pt-4"
                >
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary ml-1 block">Quantos convidados? (Incluindo você)</label>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="10"
                      className="flex-1 accent-brand-primary h-3 rounded-xl bg-slate-100 appearance-none cursor-pointer"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value) || 1})}
                    />
                    <div className="bg-brand-primary text-white font-black w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ring-4 ring-brand-primary/20">
                      {formData.guests}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary ml-1 block">Quem deve saber primeiro?</label>
              <div className="grid grid-cols-2 gap-4">
                {EVENT_INFO.contacts.map((contact) => (
                  <button
                    key={contact.name}
                    type="button"
                    onClick={() => setFormData({...formData, contact: contact.name})}
                    className={`p-5 rounded-3xl border-2 font-black transition-all ${formData.contact === contact.name ? 'bg-brand-primary text-white border-brand-primary shadow-lg' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}
                  >
                    {contact.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary ml-1 block">Alguma restrição alimentar ou mensagem fofa?</label>
              <textarea 
                rows={3}
                placeholder="Ex: 'Alguma restrição alimentar...' ou outra mensagem"
                className="w-full bg-brand-soft border-2 border-transparent rounded-3xl p-6 outline-none focus:border-brand-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full h-20 bg-[#25D366] text-white rounded-[2.5rem] font-black text-xl shadow-xl shadow-green-500/20 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Bora Confirmar! <Send className="w-8 h-8" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center bg-white border-t border-slate-100">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          🎁
        </motion.div>
        <p className="text-brand-dark font-black tracking-[0.3em] uppercase text-xs mb-4">ALÉXIA • Uberlândia/MG</p>
        <p className="text-slate-400 text-sm max-w-xs mx-auto italic font-medium px-6">
          Se você contar pra ela, o presente vai ter que ser o triplo do preço! 💸
        </p>
      </footer>
    </div>
  );
}

