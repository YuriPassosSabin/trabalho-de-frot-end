import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/common/Navbar';
import ClassCard from '../components/student/ClassCard';
import Button from '../components/common/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { currentUser, classes, subjects, teachers } = state;
  const [view, setView] = useState('available'); // 'available' ou 'my'

  if (!currentUser || currentUser.role !== 'student') {
    navigate('/');
    return null;
  }

  // Filtrar turmas disponíveis (onde o aluno não está matriculado)
  const availableClasses = classes.filter(
    cls => !cls.enrolledStudents.includes(currentUser.id)
  );

  // Filtrar minhas turmas
  const myClasses = classes.filter(
    cls => cls.enrolledStudents.includes(currentUser.id)
  );

  const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || 'Desconhecida';
  const getTeacherName = (id) => teachers.find(t => t.id === id)?.name || 'Desconhecido';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Olá, {currentUser.name}!</h1>

        <div className="flex gap-4 mb-6">
          <Button
            variant={view === 'available' ? 'primary' : 'secondary'}
            onClick={() => setView('available')}
          >
            Turmas Disponíveis
          </Button>
          <Button
            variant={view === 'my' ? 'primary' : 'secondary'}
            onClick={() => setView('my')}
          >
            Minhas Turmas
          </Button>
        </div>

        {view === 'available' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Turmas Disponíveis para Matrícula</h2>
            {availableClasses.length === 0 ? (
              <p className="text-gray-600">Não há turmas disponíveis no momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableClasses.map(cls => (
                  <ClassCard
                    key={cls.id}
                    classData={cls}
                    subjectName={getSubjectName(cls.subjectId)}
                    teacherName={getTeacherName(cls.teacherId)}
                    action="enroll"
                  />
                ))}
              </div>
            )}
          </>
        )}

        {view === 'my' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Minhas Turmas</h2>
            {myClasses.length === 0 ? (
              <p className="text-gray-600">Você ainda não está matriculado em nenhuma turma.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClasses.map(cls => (
                  <ClassCard
                    key={cls.id}
                    classData={cls}
                    subjectName={getSubjectName(cls.subjectId)}
                    teacherName={getTeacherName(cls.teacherId)}
                    action="none"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;