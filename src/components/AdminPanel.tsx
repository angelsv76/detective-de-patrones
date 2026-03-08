import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Edit2, Download, Upload, Save, X, Search, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Pattern } from '../types';

export const AdminPanel: React.FC = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Pattern>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('inti_patterns');
    if (saved) {
      setPatterns(JSON.parse(saved));
    } else {
      // Load initial from JSON (mocked here, in real app fetch patterns.json)
      import('../data/patterns.json').then(m => {
        setPatterns(m.default as Pattern[]);
        localStorage.setItem('inti_patterns', JSON.stringify(m.default));
      });
    }
  }, []);

  const saveToStorage = (newPatterns: Pattern[]) => {
    setPatterns(newPatterns);
    localStorage.setItem('inti_patterns', JSON.stringify(newPatterns));
  };

  const handleAdd = () => {
    const newPattern: Pattern = {
      id: `p_${Date.now()}`,
      nivel: 'basic',
      tipo: 'numérico',
      patron: '',
      respuesta: '',
      explicacion: '',
      pista: ''
    };
    saveToStorage([newPattern, ...patterns]);
    setIsEditing(newPattern.id);
    setEditForm(newPattern);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este patrón?')) {
      saveToStorage(patterns.filter(p => p.id !== id));
    }
  };

  const handleEdit = (pattern: Pattern) => {
    setIsEditing(pattern.id);
    setEditForm(pattern);
  };

  const handleSave = () => {
    if (isEditing) {
      const updated = patterns.map(p => p.id === isEditing ? { ...p, ...editForm } as Pattern : p);
      saveToStorage(updated);
      setIsEditing(null);
      setEditForm({});
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(patterns, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patterns_export.json';
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target?.result as string);
          saveToStorage(imported);
          alert('Patrones importados con éxito');
        } catch (err) {
          alert('Error al importar el archivo JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  const filtered = patterns.filter(p => 
    p.patron.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-inti-blue rounded-2xl flex items-center justify-center shadow-xl shadow-inti-blue/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-inti-blue uppercase">Panel de Control Docente</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gestión del Banco de Patrones</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleAdd} className="btn-inti btn-inti-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Nuevo Patrón
          </button>
          <button onClick={handleExport} className="btn-inti bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-2">
            <Download className="w-5 h-5" /> Exportar
          </button>
          <label className="btn-inti bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5" /> Importar
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-inti !pl-14"
          placeholder="Buscar por patrón, nivel o tipo..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((pattern) => (
            <motion.div 
              key={pattern.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`card-inti border-2 transition-all ${isEditing === pattern.id ? 'border-inti-blue ring-4 ring-inti-blue/5' : 'border-slate-100'}`}
            >
              {isEditing === pattern.id ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nivel</label>
                      <select 
                        value={editForm.nivel}
                        onChange={(e) => setEditForm({...editForm, nivel: e.target.value as any})}
                        className="input-inti"
                      >
                        <option value="basic">Básico</option>
                        <option value="medium">Medio</option>
                        <option value="advanced">Avanzado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tipo</label>
                      <input 
                        type="text"
                        value={editForm.tipo}
                        onChange={(e) => setEditForm({...editForm, tipo: e.target.value})}
                        className="input-inti"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Patrón</label>
                      <input 
                        type="text"
                        value={editForm.patron}
                        onChange={(e) => setEditForm({...editForm, patron: e.target.value})}
                        className="input-inti"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Respuesta Correcta</label>
                      <input 
                        type="text"
                        value={editForm.respuesta}
                        onChange={(e) => setEditForm({...editForm, respuesta: e.target.value})}
                        className="input-inti"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Explicación de la Regla</label>
                      <input 
                        type="text"
                        value={editForm.explicacion}
                        onChange={(e) => setEditForm({...editForm, explicacion: e.target.value})}
                        className="input-inti"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pista para el Alumno</label>
                      <input 
                        type="text"
                        value={editForm.pista}
                        onChange={(e) => setEditForm({...editForm, pista: e.target.value})}
                        className="input-inti"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button onClick={() => setIsEditing(null)} className="btn-inti bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-2">
                      <X className="w-5 h-5" /> Cancelar
                    </button>
                    <button onClick={handleSave} className="btn-inti btn-inti-primary flex items-center gap-2">
                      <Save className="w-5 h-5" /> Guardar Cambios
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white ${
                      pattern.nivel === 'basic' ? 'bg-inti-yellow' : 
                      pattern.nivel === 'medium' ? 'bg-inti-green' : 'bg-inti-blue'
                    }`}>
                      {pattern.nivel[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg font-black tracking-tight text-slate-800">{pattern.patron}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-md">{pattern.tipo}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium italic">Regla: {pattern.explicacion}</p>
                      <p className="text-[10px] text-inti-yellow font-bold uppercase tracking-widest mt-1">Pista: {pattern.pista}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(pattern)} className="p-3 text-slate-400 hover:text-inti-blue hover:bg-inti-blue/5 rounded-xl transition-all">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(pattern.id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
