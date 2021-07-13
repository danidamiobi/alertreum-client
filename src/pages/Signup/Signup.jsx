import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import http from '../../http';
import {useAlert} from 'react-alert';
import Button from '../../components/Button/Button';
import Redirect from '../../components/Redirect/Redirect';
import SignupImage from './sign-up.png';
import './style.css';

const Signup = () => {
    const history = useHistory();
    const alert = useAlert();

    const [superUser, setSuperUser] = useState(false);

    const [signUpDetails, setSignUpDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleStateEvent = event => {
        setSignUpDetails({
            ...signUpDetails,
            [event.target.name]: event.target.value
        });
    }

    const signUp = async event => {
        event.preventDefault();
        setIsLoading(true)
        try {

            const signUpUser = await http.post('/signup', {
                ...signUpDetails,
                create_super_user: superUser
            });

            console.log(signUpUser);
            setIsLoading(false);
            alert.success(signUpUser.data.message);
            setErrorMessage('')
            history.push('/login');
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setIsLoading(false);
        }
    }

    const handleSuperUser = () => setSuperUser(!superUser);

    //Redirects a user when they visit the signup route when they are still logged in
    useEffect(() => {
        const checkUserAuth = () => {
            if(Cookie.get('alertrium-user')) {
                return history.push('/')
            }
        }
        checkUserAuth()
    }, [history])

    return (
        <div id="sign-up">
           <div className="pt-5">
               <div className="mt-4 pb-5">
                   <div className="container pb-5">
                       <div className="mx-auto col-lg-9">
                           <h1 className="text-center white font-weight-bold">Alertrium</h1>
                             <div className="card mt-5 round-card">
                                <h1 className="px-5 mt-5 gray">Signup now!</h1>
                                    {
                                        errorMessage && (
                                            <div className="container mt-4 px-5">
                                                <div className="alert alert-danger font-weight-bold">
                                                    {errorMessage}
                                                </div>
                                            </div>
                                        )
                                    }
                                <div className="card-body">
                                    <div className="row py-5">
                                        <div className="col-lg-6" id="left-pane">
                                            <img 
                                                src={SignupImage} 
                                                alt="signup"
                                                id="sign-up-img"
                                             />
                                        </div>
                                        <div className="col-lg-6">
                                            <form onSubmit={signUp}>
                                                <div>
                                                    <label htmlFor="name" className="gray">Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="name"
                                                        id="name"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Name..."
                                                        onChange={handleStateEvent}
                                                        defaultValue={signUpDetails.name}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label htmlFor="email" className="gray">Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email"
                                                        id="email"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Email..."
                                                        onChange={handleStateEvent}
                                                        defaultValue={signUpDetails.email}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label htmlFor="phone-number" className="gray">Phone number</label>
                                                    <input 
                                                        type="number"
                                                        id="phone-number"
                                                        name="phone_number"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Phone number..."
                                                        onChange={handleStateEvent}
                                                        defaultValue={signUpDetails.phoneNumber}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label htmlFor="password" className="gray">Password</label>
                                                    <input 
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Password..."
                                                        onChange={handleStateEvent}
                                                        defaultValue={signUpDetails.password}
                                                        autoComplete="true"
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <label htmlFor="confirm-password" className="gray">Confirm Password</label>
                                                    <input 
                                                        type="password" 
                                                        id="confirm-password"
                                                        name="confirm_password"
                                                        className="col-lg-12 form-control input-text-small"
                                                        placeholder="Confirm password..."
                                                        onChange={handleStateEvent}
                                                        defaultValue={signUpDetails.confirmPassword}
                                                        autoComplete="true"
                                                    />
                                                </div>
                                                <div className="mt-4 pt-2">
                                                    <Button 
                                                        label="Sign up"
                                                        className="btn col-lg-12 font-weight-bold"
                                                        variant="primary"
                                                        textColor="white"
                                                        loading={isLoading}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                                <div className="pt-4">
                                                    <input type="checkbox" onClick={handleSuperUser} />
                                                    <span className="pl-2">Sign up as a super user</span>
                                                </div>
                                            </form>
                                            <div className="mt-4">
                                                <Redirect 
                                                    alternative="Already have an account? click"
                                                    link={{text: "here", link:"/login"}}
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

export default Signup;