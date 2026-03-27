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
        id: Date.now(),
        ...action.payload,
        enrolledStudents: []
      };
      return { ...state, classes: [...state.classes, newClass] };

    case UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id ? action.payload : cls
        )
      };

    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔹 Persistir usuário
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  // 🔹 Persistir turmas
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(state.classes));
  }, [state.classes]);

  // 🔹 Login
  const setCurrentUser = (user) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });

    if (!user) {
      localStorage.removeItem("currentUser");
    }
  };

  // 🔹 Criar turma (LOCAL)
  const addClass = (classData) => {
    dispatch({ type: ADD_CLASS, payload: classData });
  };

  // 🔹 Matricular aluno (LOCAL)
  const enrollStudent = (classId, studentId) => {
    const cls = state.classes.find(c => c.id === classId);

    if (!cls) return;

    if (cls.enrolledStudents.includes(studentId)) return;

    const updatedClass = {
      ...cls,
      enrolledStudents: [...cls.enrolledStudents, studentId]
    };

    dispatch({ type: UPDATE_CLASS, payload: updatedClass });
  };

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