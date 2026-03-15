const AppContext = React.createContext();

function AppProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [courses, setCourses] = React.useState([
        { id: 1, discipline: 'Matemática', professor: 'Prof. João', schedule: '21', vacancies: 30 },
        { id: 2, discipline: 'Física', professor: 'Prof. Maria', schedule: '33', vacancies: 25 },
    ]);
    const [enrollments, setEnrollments] = React.useState([]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    const addCourse = (course) => {
        setCourses([...courses, { ...course, id: courses.length + 1 }]);
    };

    const enroll = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        if (course && course.vacancies > 0) {
            setEnrollments([...enrollments, { userId: user.id, courseId }]);
            setCourses(courses.map(c => 
                c.id === courseId ? { ...c, vacancies: c.vacancies - 1 } : c
            ));
        } else {
            alert('Turma lotada!');
        }
    };

    const value = { user, courses, enrollments, login, logout, addCourse, enroll };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}