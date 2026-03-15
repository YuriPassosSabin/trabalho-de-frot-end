function CourseForm() {
    const { addCourse } = React.useContext(AppContext);
    const [discipline, setDiscipline] = React.useState('');
    const [professor, setProfessor] = React.useState('');
    const [schedule, setSchedule] = React.useState('');
    const [vacancies, setVacancies] = React.useState(30);
    const history = ReactRouterDOM.useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse({ discipline, professor, schedule, vacancies: Number(vacancies) });
        // Redireciona para a home após adicionar
        history.push('/');
    };

    return (
        <div id="course-form">
            <h2>Nova Oferta de Turma</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Disciplina" 
                    value={discipline} 
                    onChange={e => setDiscipline(e.target.value)} 
                    required 
                />
                <input 
                    placeholder="Professor" 
                    value={professor} 
                    onChange={e => setProfessor(e.target.value)} 
                    required 
                />
                <input 
                    placeholder="Horário (ex: 21)" 
                    value={schedule} 
                    onChange={e => setSchedule(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Vagas" 
                    value={vacancies} 
                    onChange={e => setVacancies(e.target.value)} 
                    required 
                />
                <button type="submit">Salvar Turma</button>
            </form>
        </div>
    );
}