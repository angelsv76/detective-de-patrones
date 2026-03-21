/**
 * HeaderFooter.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import { Search, ShieldCheck, User } from 'lucide-react';
import { motion } from 'motion/react';

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-inti-blue rounded-xl flex items-center justify-center shadow-lg shadow-inti-blue/20">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-inti-blue leading-none">INTI</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-inti-green mt-1">Detective de Patrones</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
          <span className="hover:text-inti-blue cursor-default transition-colors">Tradición</span>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="hover:text-inti-blue cursor-default transition-colors">Disciplina</span>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="hover:text-inti-blue cursor-default transition-colors">Estructura</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-inti-green" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Laboratorio 2026</span>
        </div>
      </div>
      
      {/* INTI Stripes */}
      <div className="flex w-full h-1">
        <div className="flex-1 bg-inti-blue" />
        <div className="flex-1 bg-inti-yellow" />
        <div className="flex-1 bg-inti-green" />
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-inti-blue" />
              </div>
              <span className="text-lg font-black tracking-tighter">INTI 2026</span>
            </div>
            <p className="text-slate-400 text-sm text-center md:text-left">
              Laboratorio de Pensamiento Computacional. Innovación y Tecnología para el Futuro.
            </p>
          </div>
          
          <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            <span>#OrgulloINTI</span>
            <span>#BachilleratoTécnico</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs font-bold text-slate-400">© 2026 Instituto Nacional Técnico Industrial</p>
            <p className="text-[10px] text-slate-500">Desarrollado por Ángel Sánchez</p>
            <div className="flex gap-4 mt-1">
              <div className="w-2 h-2 rounded-full bg-inti-blue" />
              <div className="w-2 h-2 rounded-full bg-inti-yellow" />
              <div className="w-2 h-2 rounded-full bg-inti-green" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
