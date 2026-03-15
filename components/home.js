function Home() {
    const { user } = React.useContext(AppContext);
    return (
        <div id="main">
            <h1>HOME</h1>
            <img src="Imagens/Lp_logo_unisinos.png" alt="Logo da universidade" style={{ width: '200px' }}/>
            <p>Bem-vindo ao Sistema de Matrículas.</p>
            {user && <p>Olá, {user.email}!</p>}
        </div>
    );
}