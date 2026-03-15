// Decodifica o código de horário (ex: "21" -> "Segunda - Manhã")
export const decodeTimeCode = (code) => {
  const dayMap = { 2: 'Segunda', 3: 'Terça', 4: 'Quarta', 5: 'Quinta', 6: 'Sexta', 7: 'Sábado' };
  const shiftMap = { 1: 'Manhã', 2: 'Tarde', 3: 'Noite' };
  
  if (!code || code.length !== 2) return { day: 'Inválido', shift: 'Inválido', full: 'Horário inválido' };
  
  const day = code[0];
  const shift = code[1];
  
  return {
    day: dayMap[day] || 'Dia inválido',
    shift: shiftMap[shift] || 'Turno inválido',
    full: `${dayMap[day] || 'Dia?'} - ${shiftMap[shift] || 'Turno?'}`
  };
};

// Gera código de horário a partir de dia e turno (valores numéricos)
export const encodeTimeCode = (day, shift) => {
  return `${day}${shift}`;
};