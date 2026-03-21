/**
 * App.tsx
 * © 2026 Ángel Sánchez — Instituto Nacional Técnico Industrial (INTI)
 * Todos los derechos reservados.
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer } from './components/HeaderFooter';
import { HomePage } from './pages/HomePage';
import { ActivityPage } from './pages/ActivityPage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminPanel } from './components/AdminPanel';
import { Student, SessionResult } from './types';

const App: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'medium' | 'advanced' | null>(null);
  const [lastResult, setLastResult] = useState<SessionResult | null>(null);

  const handleStudentSubmit = (data: Student) => {
    setStudent(data);
  };

  const handleLevelSelect = (level: 'basic' | 'medium' | 'advanced') => {
    setSelectedLevel(level);
  };

  const handleActivityComplete = (result: SessionResult) => {
    setLastResult(result);
  };

  const handleReset = () => {
    setSelectedLevel(null);
    setLastResult(null);
    // Keep student info for convenience, or clear it if desired
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                selectedLevel && student ? (
                  <Navigate to="/activity" />
                ) : (
                  <HomePage 
                    student={student} 
                    onStudentSubmit={handleStudentSubmit} 
                    onLevelSelect={handleLevelSelect} 
                  />
                )
              } 
            />
            
            <Route 
              path="/activity" 
              element={
                student && selectedLevel ? (
                  <ActivityPage 
                    student={student} 
                    nivel={selectedLevel} 
                    onComplete={handleActivityComplete} 
                  />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            
            <Route 
              path="/results" 
              element={
                lastResult ? (
                  <ResultsPage result={lastResult} onReset={handleReset} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            
            <Route path="/admin" element={<AdminPanel />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
