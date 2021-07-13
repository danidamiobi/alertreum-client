import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import http from '../http';
import socket from '../socket';
import store from '../redux/store';
import { profileAction } from '../redux/actions/profile'
import { cryptoAction } from '../redux/actions/crypto';
import Navigation from '../components/Navigation/Navigation';
import SideNav from '../components/SideNav/SideNav';
import MobileSideNav from '../components/Mobile_SideMenu/MobileSideMenu';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Notifications from '../pages/Notifications/Notifications';
import CreateWatchList from '../pages/CreateWatchList/CreateWatchList';
import WatchList from '../pages/WatchList/Watchlist';
import PaymentHistory from '../pages/PaymentHistory/PaymentHistory';
import ConfirmPayment from '../pages/ConfirmPayment/ConfirmPayment';
import ViewUsers from '../pages/ViewUsers/ViewUsers';
import Recharge from '../pages/Recharge/Recharge';
import Auth from './middleware/Auth';
import './style.css';

const Layouts = props => {
    const [isNotified, setIsNotified] = useState({
        isNotification: false,
        userId: ''
    });

    // Gets the user details for all the components that needs it
    const getUserData = async () => {
        try {
            const profile = await http('/profile');
            store.dispatch(profileAction(profile.data));
        } catch (error) {
            // When the error.status message is unAuthorised logout the user on the client
            console.log(error)
        }
    }

    useEffect(() => {

        // Gets the current crypto list
        const cryptoListsPrices = () => {
            socket.on('crypto', cryptoLists => {
                if (cryptoLists.action === 'crypto_lists') {
                    store.dispatch(cryptoAction(cryptoLists.cryptoLists.data));
                }
            })
        }

        cryptoListsPrices();

        // Live Notification
        const notifyUser = () => {
            socket.on('crypto', notification => {
                if (notification.action === 'notification') {
                    setIsNotified({
                        isNotification: notification.data.isNotified,
                        userId: notification.data.id
                    })
                }
            })
        }

        notifyUser();

        // Existing Notification
        const existingNotification = async () => {
            try {
                const notification = await http('/notifications');
                setIsNotified({
                    isNotification: notification.data.isNotified,
                    userId: notification.data.userId
                })
            } catch (error) {
                console.log(error)
            }
        }
        existingNotification()
    }, []);

    return (
        <div>
            <BrowserRouter>
                {props.isUserLoggedIn && (<Navigation
                    isNotified={isNotified}
                />)}
                <div>
                    <div className={props.isUserLoggedIn ? 'd-flex flex-direction-row-column top-space':'d-flex flex-direction-row-column'}>
                        {props.isUserLoggedIn && (
                            <div className="col-lg-2 card pt-4 px-0" id="side-nav-main">                                
                                <SideNav getUserData={getUserData} />
                            </div>
                        )}
                        <div className={props.isUserLoggedIn ? 'px-3 main auto-width':'col-lg-12 px-0 auto-width'}>
                            <Switch>
                                <Auth exact path="/" component={Dashboard} />
                                <Auth path="/profile" component={Profile} />
                                <Auth path="/settings" component={Settings} />
                                <Auth path="/notifications" component={Notifications} />
                                <Auth path="/create-watchlist" component={CreateWatchList} />
                                <Auth path="/watch-list" component={WatchList} />
                                <Route path="/signup" component={Signup} />
                                <Route path="/login" component={Login} />
                                <Route path="/forgot-password" component={ForgotPassword} />
                                <Route path="/reset-password" component={ResetPassword} />
                                <Auth path="/recharge" component={Recharge} />
                                <Auth path="/payment-history" component={PaymentHistory} />
                                <Auth path="/confirm-payment" component={ConfirmPayment} />
                                <Auth path="/users" component={ViewUsers} />
                                <Route component={PageNotFound} />
                            </Switch>
                        </div>
                    </div>
                </div>
                <MobileSideNav getUserData={getUserData} />
            </BrowserRouter>
        </div>
    )
};

const mapStateToProps = state => ({
    isUserLoggedIn: state.isAuthenticated
});

export default connect(mapStateToProps)(Layouts);

