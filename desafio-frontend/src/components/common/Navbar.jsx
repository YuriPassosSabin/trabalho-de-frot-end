import React from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { state, setCurrentUser } = useApp();
  const { currentUser } = state;


  const navigate = useNavigate();
  const handleLogout = () => {
      setCurrentUser(null);
  navigate('/');
    // redirecionar para home (será feito no componente que usa o navbar)
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Sistema de Matrículas</h1>
      {currentUser ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {currentUser.name} ({currentUser.role === 'admin' ? 'Admin' : 'Aluno'})
          </span>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      ) : (
        <span className="text-gray-500">Não logado</span>
      )}
    </nav>
  );
};

export default Navbar;