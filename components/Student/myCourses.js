function MyCourses() {
    const { enrollments, courses, user } = React.useContext(AppContext);
    const myEnrollments = enrollments.filter(e => e.userId === user.id);
    const myCourses = myEnrollments.map(e => courses.find(c => c.id === e.courseId)).filter(c => c);

    return (
        <div id="main">
            <h2>Minhas Matrículas</h2>
            {myCourses.length === 0 ? (
                <p>Você ainda não está matriculado em nenhuma turma.</p>
            ) : (
                <ul>
                    {myCourses.map(course => (
                        <li key={course.id}>
                            {course.discipline} - {course.professor} - Horário: {course.schedule}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}