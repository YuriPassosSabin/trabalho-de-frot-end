import React, { createContext, useReducer, useContext, useEffect} from 'react';
import { users, teachers, subjects, classes as initialClasses } from '../data/mockData';

// Ações
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_CLASS = 'ADD_CLASS';
const UPDATE_CLASS = 'UPDATE_CLASS';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
<<<<<<< HEAD
const SET_CLASSES = "SET_CLASSES";
const UPDATE_CLASS = 'UPDATE_CLASS';

=======
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
const REMOVE_CLASS = 'REMOVE_CLASS';
>>>>>>> 837ce6fe0de6af8bc60d9a94d46cec9b26560d3d

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
<<<<<<< HEAD
    case SET_CLASSES:
       return { ...state, classes: action.payload };
    
    case UPDATE_CLASS:
       return {
       ...state,
        classes: state.classes.map(cls =>
        cls.id === action.payload.id ? action.payload : cls
    )
  };

=======
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
>>>>>>> 837ce6fe0de6af8bc60d9a94d46cec9b26560d3d
    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions helpers
  const setCurrentUser = (user) => dispatch({ type: SET_CURRENT_USER, payload: user });
<<<<<<< HEAD
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
=======
  const addClass = (classData) => dispatch({ type: ADD_CLASS, payload: classData });
  const updateClass = (classData) => dispatch({ type: UPDATE_CLASS, payload: classData });
  const enrollStudent = (classId, studentId) => 
    dispatch({ type: ENROLL_STUDENT, payload: { classId, studentId } });
  const unenrollStudent = (classId, studentId) =>
    dispatch({ type: UNENROLL_STUDENT, payload: { classId, studentId } });
  const removeClass = (classId) => dispatch({ type: REMOVE_CLASS, payload: classId });
>>>>>>> 837ce6fe0de6af8bc60d9a94d46cec9b26560d3d

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