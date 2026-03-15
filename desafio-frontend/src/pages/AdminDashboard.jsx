import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ClassForm from '../components/admin/ClassForm';
import { decodeTimeCode } from '../utils/helpers';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { classes, teachers, subjects } = state;
  const [showForm, setShowForm] = useState(false);

  // Se não estiver logado como admin, redireciona (proteção extra)
  // Isso pode ser feito nas rotas também, mas faremos aqui como fallback
  if (state.currentUser?.role !== 'admin') {
    navigate('/');
    return null;
  }

  const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || 'Desconhecida';
  const getTeacherName = (id) => teachers.find(t => t.id === id)?.name || 'Desconhecido';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Painel do Administrador</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nova Turma'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <ClassForm onSuccess={() => setShowForm(false)} />
          </Card>
        )}

        <h2 className="text-2xl font-semibold mb-4">Turmas Existentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(cls => (
            <Card key={cls.id} className="hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{getSubjectName(cls.subjectId)}</h3>
              <p className="text-gray-600">Professor: {getTeacherName(cls.teacherId)}</p>
              <p className="text-gray-600">Horário: {decodeTimeCode(cls.timeCode).full}</p>
              <p className="text-gray-600">Alunos matriculados: {cls.enrolledStudents.length}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;