import React, { createContext, useReducer, useContext, useEffect} from 'react';
import { users, teachers, subjects, classes as initialClasses } from '../data/mockData';

// Ações
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_CLASS = 'ADD_CLASS';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
const SET_CLASSES = "SET_CLASSES";
const UPDATE_CLASS = 'UPDATE_CLASS';


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
    case SET_CLASSES:
       return { ...state, classes: action.payload };
    
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

  // Actions helpers
  const setCurrentUser = (user) => dispatch({ type: SET_CURRENT_USER, payload: user });
  const addClass = async (classData) => {
  try {
    const response = await fetch("http://localhost:3000/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(classData)
    });

    const newClass = await response.json();

    dispatch({ type: ADD_CLASS, payload: newClass });

  } catch (error) {
    console.error("Erro ao criar turma:", error);
  }
};
  const enrollStudent = async (classID, studentID) => {
  try {
    const response = await fetch("http://localhost:3000/classes/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ classID, studentID })
    });

    const updatedClass = await response.json();

    dispatch({ type: UPDATE_CLASS, payload: updatedClass });

  } catch (error) {
    console.error("Erro ao matricular:", error);
  }
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