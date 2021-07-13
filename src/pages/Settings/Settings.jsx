import { useEffect, useState, useRef } from 'react';
import { useAlert } from 'react-alert';
import http from '../../http';
import Button from '../../components/Button/Button';
import TopSection from '../../components/TopSection/TopSection';
import Loader from '../../components/Loader/Loader';
import './style.css';

const Settings = () => {
    const alert = useAlert();

    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const business = useRef();

    const [loading, setLoading] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const updateUser = async event => {
        event.preventDefault();
        setLoading(true);

        const name = event.target.name.value;
        const email = event.target.email.value;
        const oldPassword = event.target.password.value;
        const newPassword = event.target.new_password.value;
        const phoneNumber = event.target.phoneNumber.value;

        try {
            const updateUserData = await http.post('/settings', {
                name: name,
                email: email,
                password: oldPassword,
                newPassword: newPassword,
                phoneNumber: phoneNumber
            });

            alert.success(updateUserData.data.message);
            setLoading(false);

            setTimeout(() => {
                window.location.href = '/settings'
            }, 1000);

        } catch (error) {
            setLoading(false);
            setErrorMessage(error.response.data.error);
        }
    }

    useEffect(() => {
        const getUserSettingsData = async () => {
            try {
                const settingsData = await http('/settings');
                setIsSettings(true);
                name.current.value = settingsData.data.name;
                email.current.value = settingsData.data.email;
                phone.current.value = settingsData.data.phoneNumber || '';
                business.current.value = settingsData.data.business || '';
            } catch (error) {
                console.log(error);
            }
        }
        getUserSettingsData()
    }, [])

    return (
        <div>
            {
                !isSettings ? (
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-5">
                            <Loader
                                label="Fetching your details...."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-5">
                        <div className="px-3 pb-3">
                            <TopSection
                                label="Settings"
                                icon="fa fa-cogs"
                            />
                        </div>
                        <div className="col-lg-12 pt-1 pb-4">
                            <div className="card round-card pt-1 pb-3">
                                <div className="card-body">
                                    {
                                        errorMessage && (
                                            <div className="container">
                                                <div className="alert alert-danger font-weight-bold py-3">
                                                    {errorMessage}
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="mt-5">
                                        <div className="container">
                                            <form onSubmit={updateUser}>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="text"
                                                            className="form-control py-4"
                                                            name="name"
                                                            placeholder="Name..."
                                                            ref={name}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="email"
                                                            className="form-control py-4"
                                                            name="email"
                                                            placeholder="Email..."
                                                            ref={email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="password"
                                                            className="form-control py-4"
                                                            name="password"
                                                            placeholder="(Current) Login Password..."
                                                            autoComplete="true"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="password"
                                                            className="form-control py-4"
                                                            name="new_password"
                                                            placeholder="New password..."
                                                            autoComplete="true"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="number"
                                                            className="form-control py-4"
                                                            name="phoneNumber"
                                                            placeholder="Phone number..."
                                                            ref={phone}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex mt-5 justify-content-center">
                                                    <Button
                                                        className="btn px-5 font-weight-bold"
                                                        variant="primary"
                                                        label="Update"
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
            }
        </div>
    )
};

export default Settings;