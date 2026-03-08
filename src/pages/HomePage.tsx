import React from 'react';
import { StudentForm } from '../components/StudentForm';
import { LevelSelector } from '../components/LevelSelector';
import { Student } from '../types';
import { motion } from 'motion/react';

interface HomePageProps {
  student: Student | null;
  onStudentSubmit: (student: Student) => void;
  onLevelSelect: (level: 'basic' | 'medium' | 'advanced') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ student, onStudentSubmit, onLevelSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {!student ? (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl font-black tracking-tighter text-inti-blue uppercase mb-6 leading-none"
            >
              Detective de <span className="text-inti-yellow">Patrones</span>
            </motion.h1>
            <p className="text-xl text-slate-500 font-bold uppercase tracking-widest mb-12">Laboratorio de Pensamiento Computacional</p>
          </div>
          <StudentForm onSubmit={onStudentSubmit} />
        </div>
      ) : (
        <LevelSelector onSelect={onLevelSelect} />
      )}
    </div>
  );
};
