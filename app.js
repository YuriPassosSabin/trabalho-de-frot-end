const { BrowserRouter, Route, Switch } = ReactRouterDOM;

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/admin/courses" component={CourseForm} />
                    <Route path="/courses" component={CourseList} />
                    <Route path="/my-courses" component={MyCourses} />
                </Switch>
            </BrowserRouter>
        </AppProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));