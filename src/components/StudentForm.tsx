/**
 * StudentForm.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import React, { useState } from 'react';
import { User, GraduationCap, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Student } from '../types';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Student>({
    nombre: '',
    nie: '',
    grupo: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (!formData.nombre) newErrors.push('nombre');
    if (!formData.nie) newErrors.push('nie');
    if (!formData.grupo) newErrors.push('grupo');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-inti max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
        <div className="w-12 h-12 bg-inti-blue/10 rounded-2xl flex items-center justify-center">
          <User className="w-6 h-6 text-inti-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-inti-blue uppercase">Identificación del Alumno</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completa tus datos para iniciar la misión</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">(a) Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className={`input-inti !pl-14 ${errors.includes('nombre') ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Ej: Juan Pérez"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">(b) NIE del Alumno</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                value={formData.nie}
                onChange={(e) => setFormData({...formData, nie: e.target.value})}
                className={`input-inti !pl-14 ${errors.includes('nie') ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Ej: 1234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">(c) Código del alumno</label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                value={formData.grupo}
                onChange={(e) => setFormData({...formData, grupo: e.target.value})}
                className={`input-inti !pl-14 appearance-none ${errors.includes('grupo') ? 'border-red-500 bg-red-50' : ''}`}
              >
                <option value="">Selecciona...</option>
                <option value="ITSI1A">ITSI1A</option>
                <option value="DS1A">DS1A</option>
                <option value="MA1A">MA1A</option>
                <option value="MI1A">MI1A</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-inti btn-inti-primary w-full flex items-center justify-center gap-2 group">
          Continuar a Selección de Nivel
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};
