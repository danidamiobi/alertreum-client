import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import http from '../../http';
import TopSection from '../../components/TopSection/TopSection';
import Loader from '../../components/Loader/Loader';
import './style.css';

const Profile = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        watchList: 0
    });

    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        const getProfileDetails = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            try {
                const profile = await http('/profile');
                console.log(profile.data);
                setUser(profile.data);
                setIsUserLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        getProfileDetails()
    }, [history]);

    return (
        <div className="col-lg-12 mt-5" id="profile-page">
            {
                !isUserLoaded ? (
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-5">
                            <Loader
                                label="Fetching your details...."
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <TopSection
                            label="Profile"
                            icon="fa fa-user"
                        />
                        <div className="card round-card mt-4">
                            <div className="card-body">
                                <div className="col-lg-12">
                                    <li>
                                        <h2 className="gray">{user.name}</h2>
                                    </li>
                                    <li>
                                        <h5 className="gray">{user.email}</h5>
                                    </li>
                                    <li>
                                        <h5 className="gray">{user.phoneNumber}</h5>
                                    </li>
                                    <li>
                                        <h5 className="gray">Total watchlists: {user.stakings}</h5>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Profile;