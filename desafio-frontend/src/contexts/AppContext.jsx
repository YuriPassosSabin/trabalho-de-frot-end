import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { users, teachers, subjects, classes as initialClasses } from '../data/mockData';

// 🔹 Helper seguro
const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

// Ações
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_CLASS = 'ADD_CLASS';
const UPDATE_CLASS = 'UPDATE_CLASS';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
const REMOVE_CLASS = 'REMOVE_CLASS';

const initialState = {
  users,
  teachers,
  subjects,
  classes: loadFromStorage("classes", initialClasses),
  currentUser: loadFromStorage("currentUser", null)
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
    case UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id
            ? { ...cls, ...action.payload }
            : cls
        )
      };
    case ENROLL_STUDENT:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.classId
            ? { ...cls, enrolledStudents: [...cls.enrolledStudents, action.payload.studentId] }
            : cls
        )
      };
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
  const updateClass = (classData) => dispatch({ type: UPDATE_CLASS, payload: classData });
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
      updateClass,
      enrollStudent,
      unenrollStudent,
      removeClass
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);