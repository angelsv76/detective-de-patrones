/**
 * ActivityPage.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import React, { useState, useEffect } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { Pattern, Student, ExerciseResult, SessionResult } from '../types';
import { getSessionPatterns } from '../utils/patternGenerator';
import patternsData from '../data/patterns.json';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface ActivityPageProps {
  student: Student;
  nivel: 'basic' | 'medium' | 'advanced';
  onComplete: (result: SessionResult) => void;
}

export const ActivityPage: React.FC<ActivityPageProps> = ({ student, nivel, onComplete }) => {
  const [exercises, setExercises] = useState<Pattern[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('inti_patterns');
    const bank = saved ? JSON.parse(saved) : patternsData;
    const session = getSessionPatterns(bank, nivel, 5);
    setExercises(session);
  }, [nivel]);

  const handleNext = (answer: string, explanation: string) => {
    const current = exercises[currentIndex];
    
    // Simple evaluation
    const isAnsCorrect = answer.trim() === current.respuesta.trim();
    // Rule evaluation is harder, we'll check if it's not empty and has some keywords or length
    const isExpCorrect = explanation.trim().length > 10; 

    const result: ExerciseResult = {
      patternId: current.id,
      patron: current.patron,
      respuestaCorrecta: current.respuesta,
      respuestaAlumno: answer,
      explicacionCorrecta: current.explicacion,
      explicacionAlumno: explanation,
      puntosRespuesta: isAnsCorrect ? 5 : 0,
      puntosExplicacion: isExpCorrect ? 5 : 0
    };

    const newResults = [...results, result];
    setResults(newResults);

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const totalPoints = newResults.reduce((acc, r) => acc + r.puntosRespuesta + r.puntosExplicacion, 0);
      const sessionResult: SessionResult = {
        student,
        nivel,
        ejercicios: newResults,
        puntuacionTotal: totalPoints,
        fecha: new Date().toISOString()
      };
      onComplete(sessionResult);
      navigate('/results');
    }
  };

  if (exercises.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progreso de la Misión</span>
          <div className="flex gap-2 mt-2">
            {exercises.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-12 rounded-full transition-all duration-500 ${
                  i < currentIndex ? 'bg-inti-green' : 
                  i === currentIndex ? 'bg-inti-blue w-20' : 'bg-slate-200'
                }`} 
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estudiante</span>
          <p className="text-sm font-black text-inti-blue uppercase">{student.nombre}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <ExerciseCard 
          key={exercises[currentIndex].id}
          pattern={exercises[currentIndex]}
          index={currentIndex}
          total={exercises.length}
          onNext={handleNext}
          isLast={currentIndex === exercises.length - 1}
        />
      </AnimatePresence>
    </div>
  );
};
