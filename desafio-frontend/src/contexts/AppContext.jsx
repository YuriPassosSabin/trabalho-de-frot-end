import React, { createContext, useReducer, useContext } from 'react';
import { users, teachers, subjects, classes as initialClasses } from '../data/mockData';

// Ações
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_CLASS = 'ADD_CLASS';
const ENROLL_STUDENT = 'ENROLL_STUDENT';

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

  return (
    <AppContext.Provider value={{ 
      state, 
      setCurrentUser,
      addClass,
      enrollStudent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);