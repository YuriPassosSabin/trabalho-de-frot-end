class Login extends React.Component {
    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = { email: "", password: "" };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email } = this.state;
        // Simulação: se email contém "admin" => role admin, senão student
        const role = email.includes('admin') ? 'admin' : 'student';
        const user = { id: Date.now(), email, role };
        this.context.login(user);
        // Redireciona para a home
        this.props.history.push('/');
    }

    render(){
        return (
            <div id="login">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="email" 
                        placeholder="Email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Senha" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <button type="submit">Entrar</button>
                </form>
                <p>Use qualquer email. Se conter "admin" será administrador.</p>
            </div>
        );
    }
}