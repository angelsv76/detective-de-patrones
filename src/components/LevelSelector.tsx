import React from 'react';
import { Star, BrainCircuit, Trophy, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LevelSelectorProps {
  onSelect: (level: 'basic' | 'medium' | 'advanced') => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelect }) => {
  const levels = [
    {
      id: 'basic' as const,
      title: 'Nivel Básico',
      description: 'Patrones simples de suma o repetición.',
      maxGrade: '7.0',
      icon: <Star className="w-8 h-8 text-inti-yellow" />,
      color: 'border-inti-yellow bg-inti-yellow/5',
      accent: 'bg-inti-yellow'
    },
    {
      id: 'medium' as const,
      title: 'Nivel Medio',
      description: 'Patrones alternos o incrementos variables.',
      maxGrade: '9.0',
      icon: <BrainCircuit className="w-8 h-8 text-inti-green" />,
      color: 'border-inti-green bg-inti-green/5',
      accent: 'bg-inti-green'
    },
    {
      id: 'advanced' as const,
      title: 'Nivel Avanzado',
      description: 'Patrones matemáticos más complejos.',
      maxGrade: '10.0',
      icon: <Trophy className="w-8 h-8 text-inti-blue" />,
      color: 'border-inti-blue bg-inti-blue/5',
      accent: 'bg-inti-blue'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight text-inti-blue uppercase mb-2">Selecciona tu Nivel</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Elige el desafío que deseas enfrentar hoy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(level.id)}
            className={`card-inti border-2 ${level.color} flex flex-col items-center text-center group hover:scale-105 transition-all duration-300 relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 px-3 py-1 ${level.accent} text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl`}>
              Nota Máx: {level.maxGrade}
            </div>
            <div className={`w-16 h-16 ${level.accent}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {level.icon}
            </div>
            <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase mb-3">{level.title}</h3>
            <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{level.description}</p>
            
            <div className={`mt-auto w-full py-3 rounded-xl ${level.accent} text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:shadow-lg transition-all`}>
              Comenzar Reto
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
