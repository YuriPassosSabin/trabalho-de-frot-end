import React from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { decodeTimeCode } from '../../utils/helpers';

const ClassCard = ({ classData, subjectName, teacherName, action = 'enroll' }) => {
  const { state, enrollStudent, unenrollStudent } = useApp();
  const { currentUser } = state;
  const { id, timeCode } = classData;
  const timeInfo = decodeTimeCode(timeCode);

  const handleEnroll = () => {
    if (window.confirm(`Deseja se matricular na turma de ${subjectName}?`)) {
      enrollStudent(id, currentUser.id);
    }
  };

  const handleUnenroll = () => {
    if (window.confirm(`Deseja cancelar a matrícula na turma de ${subjectName}?`)) {
      unenrollStudent(id, currentUser.id);
    }
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-2">{subjectName}</h3>
      <p className="text-gray-600">Professor: {teacherName}</p>
      <p className="text-gray-600">Horário: {timeInfo.full}</p>
      {action === 'enroll' && (
        <Button onClick={handleEnroll} className="mt-4 w-full">
          Matricular-se
        </Button>
      )}
      {action === 'unenroll' && (
        <Button onClick={handleUnenroll} variant="danger" className="mt-4 w-full">
          Desmatricular
        </Button>
      )}
    </Card>
  );
};

export default ClassCard;