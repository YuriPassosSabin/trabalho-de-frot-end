function Header() {
    const { user, logout } = React.useContext(AppContext);
    const history = ReactRouterDOM.useHistory();

    const navigateTo = (path) => {
        history.push(path);
    };

    return (
        <header>
            <h4>Sistema de Matrículas</h4>
            <ul>
                <li><a onClick={() => navigateTo('/')}>Home</a></li>
                {!user && <li><a onClick={() => navigateTo('/login')}>Login</a></li>}
                {user && user.role === 'admin' && (
                    <>
                        <li><a onClick={() => navigateTo('/admin/courses')}>Nova Turma</a></li>
                    </>
                )}
                {user && user.role === 'student' && (
                    <>
                        <li><a onClick={() => navigateTo('/courses')}>Turmas Disponíveis</a></li>
                        <li><a onClick={() => navigateTo('/my-courses')}>Minhas Matrículas</a></li>
                    </>
                )}
                {user && <li><button onClick={logout}>Sair</button></li>}
            </ul>
        </header>
    );
}