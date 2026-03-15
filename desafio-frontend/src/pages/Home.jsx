import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();
  const { state, setCurrentUser } = useApp();
  const { users } = state;

  // Encontra usuários por role
  const adminUser = users.find(u => u.role === 'admin');
  const studentUsers = users.filter(u => u.role === 'student');

  const handleSelectUser = (user) => {
    setCurrentUser(user);
    // Redireciona baseado no papel
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Bem-vindo ao Sistema</h1>
        <h2 className="text-xl mb-4">Selecione seu perfil:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin */}
          <div className="border rounded-lg p-6 bg-blue-50">
            <h3 className="text-2xl font-semibold mb-2">Administrador</h3>
            <p className="mb-4 text-gray-600">Acesso total ao gerenciamento</p>
            <Button onClick={() => handleSelectUser(adminUser)}>
              Entrar como Admin
            </Button>
          </div>

          {/* Alunos */}
          <div className="border rounded-lg p-6 bg-green-50">
            <h3 className="text-2xl font-semibold mb-2">Aluno</h3>
            <p className="mb-4 text-gray-600">Escolha um aluno para simular:</p>
            <div className="space-y-2">
              {studentUsers.map(user => (
                <Button
                  key={user.id}
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;