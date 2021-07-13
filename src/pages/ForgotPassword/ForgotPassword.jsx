import { useState } from 'react';
import http from '../../http';
import Button from '../../components/Button/Button';
import './style.css';
const ForgotPassword = () => {
    const [responseMesssage, setResponseMessage] = useState({
        status: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const verifyAccount = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const verify = await http.post('/forgot-password', {
                email: event.target.email.value
            });

            setResponseMessage({
                status: 'success',
                message: verify.data.message
            });

            setLoading(false);
        } catch (error) {

            setResponseMessage({
                status: 'error',
                message: error.response.data.error
            });

            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="pb-5" id="forgot-password">
                <div className="container pt-2 pb-5">
                    <div className="mx-auto col-lg-6 mt-5 pt-5 pb-5">
                        <div className="card pt-5 pb-5 round-card">
                            <div className="card-body">
                                {
                                    responseMesssage && responseMesssage.status === 'error' && (
                                        <div className="container pb-4">
                                            <div className="alert alert-danger font-weight-bold">
                                                {responseMesssage.message}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    responseMesssage && responseMesssage.status === 'success' && (
                                        <div className="container pb-4">
                                            <div className="alert alert-success font-weight-bold">
                                                {responseMesssage.message}
                                            </div>
                                        </div>
                                    )
                                }
                                <h3 className="text-center font-weight-bold gray">
                                    Forgot your password?
                                </h3>
                                <div className="font-weight-bold gray mt-5 px-5">
                                    Enter your email address,
                                    If you have a valid email address registered with alertrium,
                                    you will get a reset password link.
                                </div>
                                <form onSubmit={verifyAccount}>
                                    <div className="mt-5">
                                        <input
                                            type="email"
                                            className="form-control py-4 px-3"
                                            name="email"
                                            placeholder="Enter your valid email..."
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <Button
                                            label="Verify"
                                            className="btn col-lg-12 font-weight-bold"
                                            type="submit"
                                            variant="primary"
                                            textColor="white"
                                            loading={loading}
                                            disabled={loading}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ForgotPassword;