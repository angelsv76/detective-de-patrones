/**
 * ExerciseCard.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import React, { useState } from 'react';
import { Search, BrainCircuit, CheckCircle2, AlertCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Pattern } from '../types';

interface ExerciseCardProps {
  pattern: Pattern;
  index: number;
  total: number;
  onNext: (answer: string, explanation: string) => void;
  isLast: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ pattern, index, total, onNext, isLast }) => {
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer || !explanation) {
      setError(true);
      return;
    }
    onNext(answer, explanation);
    setAnswer('');
    setExplanation('');
    setError(false);
    setShowHint(false);
  };

  return (
    <motion.div 
      key={pattern.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="card-inti max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-inti-blue rounded-xl flex items-center justify-center shadow-lg shadow-inti-blue/20">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-inti-blue uppercase">Ejercicio {index + 1} de {total}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Nivel: {pattern.nivel.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              showHint ? 'bg-inti-yellow text-white border-inti-yellow' : 'bg-inti-yellow/10 text-inti-yellow border-inti-yellow/20 hover:bg-inti-yellow/20'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${showHint ? 'animate-pulse' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-wider">{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <BrainCircuit className="w-4 h-4 text-inti-green" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{pattern.tipo}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 bg-inti-yellow/5 border border-inti-yellow/20 rounded-2xl flex items-start gap-3"
          >
            <Lightbulb className="w-5 h-5 text-inti-yellow shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-inti-yellow block mb-1">Pista del Detective</span>
              <p className="text-sm text-slate-600 font-medium italic">{pattern.pista}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-slate-50 p-10 rounded-2xl border-2 border-dashed border-slate-200 text-center mb-10 group hover:border-inti-blue/30 transition-all">
        <p className="text-4xl md:text-5xl font-black tracking-[0.2em] text-slate-800 drop-shadow-sm group-hover:scale-105 transition-transform">{pattern.patron}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">1.a Respuesta del Patrón</label>
            <input 
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`input-inti text-center text-2xl font-black ${error && !answer ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="?"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">1.b Explicación de la Regla</label>
            <textarea 
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className={`input-inti min-h-[100px] resize-none text-sm ${error && !explanation ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="Explica por qué ese es el siguiente elemento..."
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold uppercase tracking-widest"
            >
              <AlertCircle className="w-4 h-4" />
              Por favor completa ambos campos para continuar
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit" className="btn-inti btn-inti-primary w-full flex items-center justify-center gap-2 group">
          {isLast ? 'Finalizar Actividad' : 'Siguiente Ejercicio'}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};
