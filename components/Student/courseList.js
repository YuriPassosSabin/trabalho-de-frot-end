function CourseList() {
    const { courses, enroll, user } = React.useContext(AppContext);

    return (
        <div id="main">
            <h2>Turmas Disponíveis</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <span>{course.discipline} - {course.professor} - Horário: {course.schedule} - Vagas: {course.vacancies}</span>
                        {course.vacancies > 0 && (
                            <button onClick={() => enroll(course.id)}>Matricular</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}