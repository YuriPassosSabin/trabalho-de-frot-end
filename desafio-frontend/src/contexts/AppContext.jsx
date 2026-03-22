import React, { createContext, useReducer, useContext } from 'react';
import { users, teachers, subjects, classes as initialClasses } from '../data/mockData';

// Ações
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_CLASS = 'ADD_CLASS';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
const REMOVE_CLASS = 'REMOVE_CLASS';

const initialState = {
  users,
  teachers,
  subjects,
  classes: initialClasses,
  currentUser: null // Inicia sem usuário logado
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ADD_CLASS:
      const newClass = {
        id: Date.now(), // id simples
        ...action.payload,
        enrolledStudents: []
      };
      return { ...state, classes: [...state.classes, newClass] };
    case ENROLL_STUDENT:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.classId
            ? { ...cls, enrolledStudents: [...cls.enrolledStudents, action.payload.studentId] }
            : cls
        )
      };
    default:
      return state;
    case UNENROLL_STUDENT:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.classId
            ? { ...cls, enrolledStudents: cls.enrolledStudents.filter(id => id !== action.payload.studentId) }
            : cls
        )
      };
    case REMOVE_CLASS:
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload)
      };
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions helpers
  const setCurrentUser = (user) => dispatch({ type: SET_CURRENT_USER, payload: user });
  const addClass = (classData) => dispatch({ type: ADD_CLASS, payload: classData });
  const enrollStudent = (classId, studentId) => 
    dispatch({ type: ENROLL_STUDENT, payload: { classId, studentId } });
  const unenrollStudent = (classId, studentId) =>
    dispatch({ type: UNENROLL_STUDENT, payload: { classId, studentId } });
  const removeClass = (classId) => dispatch({ type: REMOVE_CLASS, payload: classId });

  return (
    <AppContext.Provider value={{ 
      state, 
      setCurrentUser,
      addClass,
      enrollStudent,
      unenrollStudent,
      removeClass
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);