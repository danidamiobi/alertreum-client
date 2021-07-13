import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import store from '../../redux/store'
import { mobileNavAction } from '../../redux/actions/mobile-nav';
import { isNotLoggedIn } from '../../redux/actions/auth';
import './style.css';

const MobileSideMenu = ({ mobileNavState, userProfile, getUserData, ...props }) => {
    const router = useHistory();
    const currentRoute = useLocation().pathname;

    const logoutUser = () => {
        store.dispatch(isNotLoggedIn());
        handleCloseMenu();
        router.push('/login');
    }

    const handleCloseMenu = () => {
        props.dispatch(mobileNavAction())
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>
            <div id="mobile-side-menu" style={{ marginLeft: mobileNavState ? '0' : '-100%' }}>
                <div className="d-flex">
                    <h3
                        className="px-3 ml-1 pt-4 font-weight-bold text-center"
                        style={{ width: '91%' }}
                    >
                        Alertrium
                    </h3>
                    <div className="mt-4 pt-1">
                        <span className="fa fa-close" onClick={handleCloseMenu}></span>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="mt-3">
                        <h5 className="d-flex justify-content-center">{userProfile.name}</h5>
                        <p style={{ marginTop: '-8px' }} className="text-center gray">{userProfile.email}</p>
                    </div>
                </div>
                <div className="px-2">
                    <ul className="list-group mt-4">
                        <a href="/" onClick={handleCloseMenu}>
                            <li className={currentRoute === '/' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-home"></span> <span className="ml-1">Dashboard</span>
                            </li>
                        </a>
                        <a href="/profile">
                            <li className={currentRoute === '/profile' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-user"></span> <span className="ml-1">Profile</span>
                            </li>
                        </a>
                        {
                            userProfile.superUser && (
                                <a href="/users">
                                    <li className={currentRoute === '/users' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                        <span className="fa fa-users"></span> <span className="ml-1">Users</span>
                                    </li>
                                </a>
                            )
                        }
                        <a href="/watch-list">
                            <li className={currentRoute === '/watch-list' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-eye"></span> <span className="ml-1">Watchlist</span>
                            </li>
                        </a>
                        <a href="/notifications">
                            <li
                                className={currentRoute === '/notifications' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}
                            >
                                <span className="fa fa-bell"></span> <span className="ml-1">Notifications</span>
                            </li>
                        </a>
                        <a href="/recharge">
                            <li className={currentRoute === '/recharge' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-dollar"></span> <span className="ml-1">Recharge</span>
                            </li>
                        </a>
                        <a href="/payment-history">
                            <li className={currentRoute === '/payment-history' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-money"></span> <span className="ml-1">Payments</span>
                            </li>
                        </a>
                        <a href="/settings">
                            <li className={currentRoute === '/settings' ? `list-group-item mt-2 remove-outline active-link` : `font-weight-bold list-group-item mt-2 remove-outline`}>
                                <span className="fa fa-cogs"></span> <span className="ml-1">Settings</span>
                            </li>
                        </a>
                        <a href="#">
                            <li
                                onClick={logoutUser}
                                className="font-weight-bold list-group-item mt-2 remove-outline"
                            >
                                <span className="fa fa-sign-in"></span> <span className="ml-1">Logout</span>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    mobileNavState: state.mobileNav,
    userProfile: state.userProfile
});

export default connect(mapStateToProps)(MobileSideMenu);