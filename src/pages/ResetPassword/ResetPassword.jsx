import Button from '../../components/Button/Button';
import './style.css';

const ForgotPassword = () => {
    return (
        <div>
            <div className="pb-5" id="reset-password">
                <div className="container pt-2 pb-5">
                    <div className="mx-auto col-lg-6 mt-5 pt-5 pb-5">
                        <div className="card pt-5 pb-5 round-card">
                            <div className="card-body">
                               <h3 className="text-center font-weight-bold gray">
                                   Reset your password
                                </h3>
                                <div className="mt-5">
                                    <input 
                                        type="password" 
                                        className="form-control py-4 px-3" 
                                        name="new_password" 
                                        placeholder="New password..." 
                                    />
                                </div>
                                <div className="mt-5">
                                    <input 
                                        type="password" 
                                        className="form-control py-4 px-3" 
                                        name="confirm_password" 
                                        placeholder="Confirm password..." 
                                    />
                                </div>
                                <div className="mt-5">
                                    <Button 
                                        label="Save"
                                        className="btn col-lg-12 font-weight-bold"
                                        type="submit"
                                        variant="primary"
                                        textColor="white"
                                        loading={false}
                                        disabled={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ForgotPassword; 