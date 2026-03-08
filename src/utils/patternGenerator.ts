import { Pattern } from '../types';

export const generatePattern = (nivel: 'basic' | 'medium' | 'advanced'): Pattern => {
  const id = `gen_${Math.random().toString(36).substr(2, 9)}`;
  
  if (nivel === 'basic') {
    // Suma constante
    const start = Math.floor(Math.random() * 10) + 1;
    const step = Math.floor(Math.random() * 5) + 1;
    const sequence = [start, start + step, start + step * 2, start + step * 3];
    return {
      id,
      nivel,
      tipo: 'numérico',
      patron: `${sequence.join(', ')}, ?`,
      respuesta: (start + step * 4).toString(),
      explicacion: `Suma constante de ${step}`,
      pista: `Observa cuánto aumenta de un número al siguiente.`
    };
  }

  if (nivel === 'medium') {
    // Incremento progresivo
    const start = Math.floor(Math.random() * 5) + 1;
    const initialStep = Math.floor(Math.random() * 3) + 1;
    const sequence = [start];
    let current = start;
    let step = initialStep;
    for (let i = 0; i < 4; i++) {
      current += step;
      sequence.push(current);
      step++;
    }
    return {
      id,
      nivel,
      tipo: 'numérico',
      patron: `${sequence.join(', ')}, ?`,
      respuesta: (current + step).toString(),
      explicacion: `El incremento aumenta en 1 cada vez`,
      pista: `La diferencia entre los números no es siempre la misma, ¡va creciendo!`
    };
  }

  // Advanced: Fibonacci o Multiplicación
  if (Math.random() > 0.5) {
    // Multiplicación
    const start = Math.floor(Math.random() * 3) + 2;
    const factor = Math.floor(Math.random() * 2) + 2;
    const sequence = [start, start * factor, start * factor * factor, start * factor * factor * factor];
    return {
      id,
      nivel,
      tipo: 'numérico',
      patron: `${sequence.join(', ')}, ?`,
      respuesta: (start * Math.pow(factor, 4)).toString(),
      explicacion: `Multiplicación constante por ${factor}`,
      pista: `Busca un número por el cual multiplicar el anterior para obtener el siguiente.`
    };
  } else {
    // Fibonacci-like
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const sequence = [a, b, a + b, b + (a + b), (a + b) + (b + (a + b))];
    return {
      id,
      nivel,
      tipo: 'numérico',
      patron: `${sequence.join(', ')}, ?`,
      respuesta: (sequence[3] + sequence[4]).toString(),
      explicacion: `Cada número es la suma de los dos anteriores`,
      pista: `¿Qué pasa si sumas los dos últimos números que ves?`
    };
  }
};

export const getSessionPatterns = (bank: Pattern[], nivel: 'basic' | 'medium' | 'advanced', count: number = 5): Pattern[] => {
  const filtered = bank.filter(p => p.nivel === nivel);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  
  const results = shuffled.slice(0, count);
  
  // Fill with generated if not enough
  while (results.length < count) {
    results.push(generatePattern(nivel));
  }
  
  return results;
};
