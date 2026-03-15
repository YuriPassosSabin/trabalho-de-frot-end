import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';
import { encodeTimeCode } from '../../utils/helpers';

const ClassForm = ({ onSuccess }) => {
  const { state, addClass } = useApp();
  const { teachers, subjects } = state;

  const [subjectId, setSubjectId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [day, setDay] = useState('2'); // padrão segunda
  const [shift, setShift] = useState('1'); // padrão manhã

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectId || !teacherId) {
      alert('Preencha todos os campos');
      return;
    }

    const timeCode = encodeTimeCode(day, shift);
    addClass({
      subjectId: parseInt(subjectId),
      teacherId: parseInt(teacherId),
      timeCode
    });

    // Limpar formulário
    setSubjectId('');
    setTeacherId('');
    setDay('2');
    setShift('1');
    
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Nova Turma</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Disciplina</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Selecione</option>
          {subjects.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Professor</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Selecione</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dia da semana</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="2">Segunda</option>
            <option value="3">Terça</option>
            <option value="4">Quarta</option>
            <option value="5">Quinta</option>
            <option value="6">Sexta</option>
            <option value="7">Sábado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Turno</label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1">Manhã</option>
            <option value="2">Tarde</option>
            <option value="3">Noite</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Criar Turma</Button>
      </div>
    </form>
  );
};

export default ClassForm;