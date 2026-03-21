/**
 * ResultsPage.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import React from 'react';
import { Trophy, FileText, Share2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { SessionResult } from '../types';
import { generateReport } from '../utils/pdfGenerator';
import { useNavigate } from 'react-router-dom';

interface ResultsPageProps {
  result: SessionResult | null;
  onReset: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, onReset }) => {
  const navigate = useNavigate();

  if (!result) return null;

  const getNormalizedScore = () => {
    const rawScore = result.puntuacionTotal; // Max 50
    const percentage = rawScore / 50;
    switch (result.nivel) {
      case 'basic':
        return percentage * 7.0;
      case 'medium':
        return percentage * 9.0;
      case 'advanced':
        return percentage * 10.0;
      default:
        return percentage * 10.0;
    }
  };

  const score10 = getNormalizedScore();
  
  const getPassStatus = () => {
    switch (result.nivel) {
      case 'basic':
        return score10 >= 7.0;
      case 'medium':
        return score10 >= 8.0;
      case 'advanced':
        return score10 >= 10.0;
      default:
        return false;
    }
  };

  const isApproved = getPassStatus();
  const passThreshold = result.nivel === 'basic' ? '7.0' : result.nivel === 'medium' ? '8.0' : '10.0';

  const handleDownload = () => {
    generateReport({
      nombre: result.student.nombre,
      nie: result.student.nie,
      grupo: result.student.grupo,
      nivel: result.nivel,
      puntuacion: result.puntuacionTotal,
      ejercicios: result.ejercicios.map(ex => ({
        patron: ex.patron,
        respuestaCorrecta: ex.respuestaCorrecta,
        respuestaAlumno: ex.respuestaAlumno,
        explicacionCorrecta: ex.explicacionCorrecta,
        explicacionAlumno: ex.explicacionAlumno,
        puntosRespuesta: ex.puntosRespuesta,
        puntosExplicacion: ex.puntosExplicacion
      }))
    });
  };

  const handleReset = () => {
    onReset();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-inti text-center mb-12 border-4 border-inti-blue/10"
      >
        <div className="w-24 h-24 bg-inti-yellow/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-inti-yellow/20">
          <Trophy className="w-12 h-12 text-inti-yellow" />
        </div>
        
        <h1 className="text-5xl font-black tracking-tighter text-inti-blue uppercase mb-4 leading-none">Misión Completada</h1>
        <p className="text-xl text-slate-500 font-bold uppercase tracking-widest mb-12">Resultados del Laboratorio</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Nota Final</span>
            <p className={`text-4xl font-black ${isApproved ? 'text-inti-green' : 'text-red-500'}`}>
              {score10.toFixed(1)}
            </p>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Min: {passThreshold}</span>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Estado</span>
            <p className={`text-xl font-black uppercase ${isApproved ? 'text-inti-green' : 'text-red-500'}`}>
              {isApproved ? 'Aprobado' : 'Reprobado'}
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Nivel</span>
            <p className="text-xl font-black text-inti-blue uppercase">{result.nivel}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Estudiante</span>
            <p className="text-xs font-black text-slate-700 uppercase leading-tight truncate">{result.student.nombre}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={handleDownload} className="btn-inti btn-inti-primary flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" /> Generar Reporte PDF
          </button>
          <button onClick={() => window.open('https://classroom.google.com', '_blank')} className="btn-inti bg-inti-green text-white hover:bg-inti-green/90 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" /> Entregar en Classroom
          </button>
          <button onClick={handleReset} className="btn-inti bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Nueva Sesión
          </button>
        </div>
      </motion.div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-inti-blue uppercase mb-8 border-b border-slate-100 pb-4">Detalle de Ejercicios</h2>
        {result.ejercicios.map((ex, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-inti flex flex-col md:flex-row items-center gap-8"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white ${
              ex.puntosRespuesta + ex.puntosExplicacion === 10 ? 'bg-inti-green' : 
              ex.puntosRespuesta + ex.puntosExplicacion > 0 ? 'bg-inti-yellow' : 'bg-red-500'
            }`}>
              {i + 1}
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-lg font-black text-slate-800 mb-2">{ex.patron}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Respuesta</span>
                  <div className="flex items-center gap-2">
                    {ex.puntosRespuesta === 5 ? <CheckCircle2 className="w-4 h-4 text-inti-green" /> : <XCircle className="w-4 h-4 text-red-500" />}
                    <span className="font-bold">{ex.respuestaAlumno}</span>
                    <span className="text-slate-400 italic">(Correcta: {ex.respuestaCorrecta})</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Explicación</span>
                  <div className="flex items-center gap-2">
                    {ex.puntosExplicacion === 5 ? <CheckCircle2 className="w-4 h-4 text-inti-green" /> : <XCircle className="w-4 h-4 text-red-500" />}
                    <span className="font-medium">{ex.explicacionAlumno}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Puntos</span>
              <p className="text-2xl font-black text-inti-blue">{ex.puntosRespuesta + ex.puntosExplicacion} <span className="text-xs text-slate-400">/ 10</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
