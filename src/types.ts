export interface Pattern {
  id: string;
  nivel: 'basic' | 'medium' | 'advanced';
  tipo: string;
  patron: string;
  respuesta: string;
  explicacion: string;
  pista: string;
}

export interface Student {
  nombre: string;
  nie: string;
  grupo: string;
}

export interface ExerciseResult {
  patternId: string;
  patron: string;
  respuestaCorrecta: string;
  respuestaAlumno: string;
  explicacionCorrecta: string;
  explicacionAlumno: string;
  puntosRespuesta: number;
  puntosExplicacion: number;
}

export interface SessionResult {
  student: Student;
  nivel: 'basic' | 'medium' | 'advanced';
  ejercicios: ExerciseResult[];
  puntuacionTotal: number;
  fecha: string;
}
