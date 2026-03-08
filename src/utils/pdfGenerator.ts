import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExerciseResult {
  patron: string;
  respuestaCorrecta: string;
  respuestaAlumno: string;
  explicacionCorrecta: string;
  explicacionAlumno: string;
  puntosRespuesta: number;
  puntosExplicacion: number;
}

interface ReportData {
  nombre: string;
  nie: string;
  grupo: string;
  nivel: string;
  puntuacion: number;
  ejercicios: ExerciseResult[];
}

export const generateReport = (data: ReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header INTI
  doc.setFillColor(0, 47, 108); // Azul bandera
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTITUTO NACIONAL TÉCNICO INDUSTRIAL', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Detective de Patrones: Laboratorio de Pensamiento Computacional', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text('REPORTE DE EVIDENCIA - 2026', pageWidth / 2, 33, { align: 'center' });

  // Student Info
  const getNormalizedScore = (puntuacion: number, nivel: string) => {
    const percentage = puntuacion / 50;
    switch (nivel) {
      case 'basic': return percentage * 7.0;
      case 'medium': return percentage * 9.0;
      case 'advanced': return percentage * 10.0;
      default: return percentage * 10.0;
    }
  };
  const score10 = getNormalizedScore(data.puntuacion, data.nivel);

  const getPassStatus = () => {
    switch (data.nivel) {
      case 'basic': return score10 >= 7.0;
      case 'medium': return score10 >= 8.0;
      case 'advanced': return score10 >= 10.0;
      default: return false;
    }
  };
  const isApproved = getPassStatus();

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Nombre: ${data.nombre}`, 20, 50);
  doc.text(`NIE: ${data.nie}`, 20, 57);
  doc.text(`Grupo: ${data.grupo}`, 20, 64);
  
  doc.text(`Nivel: ${data.nivel.toUpperCase()}`, 140, 50);
  doc.text(`Nota Final: ${score10.toFixed(1)} / 10.0`, 140, 57);
  doc.text(`Estado: ${isApproved ? 'APROBADO' : 'REPROBADO'}`, 140, 64);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 71);

  doc.setDrawColor(128, 128, 0); // Verde olivo
  doc.setLineWidth(1);
  doc.line(20, 75, pageWidth - 20, 75);

  // Table of Exercises
  const tableRows = data.ejercicios.map((ex, index) => [
    `#${index + 1}`,
    ex.patron,
    `${ex.respuestaAlumno} (${ex.respuestaCorrecta})`,
    `${ex.explicacionAlumno} (${ex.explicacionCorrecta})`,
    `${ex.puntosRespuesta + ex.puntosExplicacion}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['N°', 'Patrón', 'Respuesta (Correcta)', 'Explicación (Correcta)', 'Puntos']],
    body: tableRows,
    headStyles: { fillColor: [0, 47, 108] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 20, right: 20 }
  });

  // Footer
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Este documento sirve como evidencia de la actividad realizada en el laboratorio.', 20, finalY);
  doc.text('INTI - Innovación y Tecnología para el Futuro.', 20, finalY + 5);

  // Filename
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const dateStr = `${day}-${month}-${year}`;
  
  const filename = `Clase-Patrones-${data.nie}-${data.nombre.replace(/\s+/g, '_')}-INTI-${dateStr}.pdf`;
  doc.save(filename);
};
