import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import http from '../../http';
import setAuthHeader from '../../utils/setAuth';
import store from '../../redux/store';
import { isLoggedIn } from '../../redux/actions/auth';
import Button from '../../components/Button/Button';
import Redirect from '../../components/Redirect/Redirect';
import LoginImage from './login.png';
import './style.css';

const Login = () => {
    const history = useHistory();

    //User component state
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    //Change event for login component state
    const changeStateData = event => {
        setLoginDetails({
            ...loginDetails,
            [event.target.name]: event.target.value
        });
    }

    //Error for login component state
    const [errorMessage, setErrorMessage] = useState('');

    //Loading
    const [loading, setLoading] = useState(false);

    //Login function
    const loginUserFunc = async event => {
        event.preventDefault();
        setLoading(true)
        try {
            const loginUser = await http.post('/login', {
                ...loginDetails
            });

            console.log(loginUser.data.token)

            setErrorMessage('');

            //Cookie lasts for an hour
            Cookie.set('alertrium-user', JSON.stringify(loginUser.data.token), {
                expires: 3600
            });

            setLoading(false);

            const token = JSON.parse(Cookie.get('alertrium-user'));

            setAuthHeader(token);

            console.log(token);

            store.dispatch(isLoggedIn());

            history.push('/');
        } 
        catch(error) {
            setErrorMessage(error.response.data.error);
            setLoading(false);
        }
    }

    //Redirects a user when they visit the login route when they are still logged in
    useEffect(() => {
        const checkUserAuth = () => {
            if(Cookie.get('alertrium-user')) {
                return history.push('/')
            }
        }
        checkUserAuth()
    }, [history])

    return (
        <div id="login">
           <div className="pt-5">
               <div className="mt-4 pb-5">
                   <div className="container pb-5">
                       <div className="mx-auto col-lg-9">
                           <h1 className="text-center white font-weight-bold">Alertrium</h1>
                           <div className="card mt-5 round-card">
                            <h1 className="px-5 mt-5 gray">Login now!</h1>
                                {
                                    errorMessage && (
                                        <div className="container px-5 mt-4">
                                            <div className="alert alert-danger py-3 font-weight-bold">
                                                {errorMessage}
                                            </div>
                                        </div>
                                    )
                                }
                               <div className="card-body">
                                    <div className="row py-5">
                                        <div className="col-lg-6" id="left-pane">
                                            <img 
                                                src={LoginImage} 
                                                alt="signup"
                                                id="sign-up-img"
                                             />
                                        </div>
                                        <div className="col-lg-6">
                                            <form onSubmit={loginUserFunc}>
                                                <div className="mt-4">
                                                    <label htmlFor="email" className="gray">Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email"
                                                        id="email"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Email..."
                                                        onChange={changeStateData}
                                                        defaultValue={loginDetails.email}
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="password" className="gray">Password</label>
                                                    <input 
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Password..."
                                                        onChange={changeStateData}
                                                        autoComplete="true"
                                                        defaultValue={loginDetails.password}
                                                    />
                                                </div>
                                            
                                                <div className="mt-4 pt-4">
                                                    <Button 
                                                        label="Login"
                                                        className="btn col-lg-12 font-weight-bold"
                                                        variant="primary"
                                                        textColor="white"
                                                        loading={loading}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </form>
                                            <div className="mt-4">
                                                <Redirect 
                                                    alternative="Don't have an account? click"
                                                    link={{text: "here", link:"/signup"}}
                                                />
                                            </div>
                                            <div className="mt-1">
                                                <Redirect 
                                                    alternative="Forgot your password? click"
                                                    link={{text: "here", link:"/forgot-password"}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
};

export default Login;