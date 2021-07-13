import Cookie from 'js-cookie';
import { LOGIN, LOGOUT } from '../types';
import setAuthHeader from '../../utils/setAuth';

//Action for a logged in user
export const isLoggedIn = () => ({
    type: LOGIN,
    isLoggedIn: true
});

//Action for a logged out user
export const isNotLoggedIn = () => {
    Cookie.remove('alertrium-user');
    setAuthHeader();
    return {
        type: LOGOUT,
        isLoggedOut: false
    }
};