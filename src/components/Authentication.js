import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'

function Authentication() {

    const [auth, setAuth] = React.useState(false)

    const readCookie = () => {
        const user = Cookies.get('user')
        if (user) {
            setAuth(true)
        }
    }

    React.useEffect(() => {
        readCookie()
    }, [])

    return (
        <div>

            <AuthApi.Provider value={{ auth, setAuth }}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>

        </div>
    )
}

const Login = () => {
    const Auth = React.useContext(AuthApi)
    const handleClick = () => {
        Auth.setAuth(true)
        Cookies.set('user', 'loginTrue')
    }
    return (
        <div>
            <h2>Welcome to the world of authentication</h2>
            <button onClick={handleClick} >Login</button>
        </div>
    )
}


const Dashboard = () => {
    const Auth = React.useContext(AuthApi)
    const handleOnClick = ()=>{
       
        Auth.setAuth(false)
        Cookies.remove('user')
        
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    )
}

const Routes = () => {
    const Auth = React.useContext(AuthApi)
    return (
        <Switch>
            <ProtectedLogin path='/login' component={Login} auth={Auth.auth} />
            <ProtectedRoute path='/dashboard' component={Dashboard} auth={Auth.auth} />
        </Switch>
    )
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={() => auth ? (
            <Component />
        ) : (<Redirect to='/login' />)}
        />
    )

}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={() => !auth ? (
            <Component />
        ) : (<Redirect to='/dashboard' />)}
        />
    )

}



export default Authentication
