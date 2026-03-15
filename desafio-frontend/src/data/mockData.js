export const users = [
  { id: 1, name: 'Admin', role: 'admin' },
  { id: 2, name: 'João Aluno', role: 'student' },
  { id: 3, name: 'Maria Aluna', role: 'student' }
];

export const teachers = [
  { id: 1, name: 'Prof. Ana Silva' },
  { id: 2, name: 'Prof. Carlos Souza' },
  { id: 3, name: 'Prof. Mariana Lima' }
];

export const subjects = [
  { id: 1, name: 'Matemática', code: 'MAT101' },
  { id: 2, name: 'Português', code: 'POR102' },
  { id: 3, name: 'História', code: 'HIS103' },
  { id: 4, name: 'Física', code: 'FIS104' }
];

export const classes = [
  {
    id: 1,
    subjectId: 1,
    teacherId: 1,
    timeCode: '21', // segunda manhã
    enrolledStudents: [2] // João está matriculado
  },
  {
    id: 2,
    subjectId: 2,
    teacherId: 2,
    timeCode: '33', // terça noite
    enrolledStudents: []
  },
  {
    id: 3,
    subjectId: 3,
    teacherId: 3,
    timeCode: '42', // quarta tarde
    enrolledStudents: [3] // Maria está matriculada
  },
  {
    id: 4,
    subjectId: 4,
    teacherId: 1,
    timeCode: '51', // quinta manhã
    enrolledStudents: []
  }
];