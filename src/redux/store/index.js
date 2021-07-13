import { combineReducers, createStore } from 'redux';
import MobileNavReducer from '../reducers/mobile-nav';
import auth from '../reducers/auth';
import notify from '../reducers/notify';
import profile from '../reducers/profile';
import cryptoList from '../reducers/crypto';
import notification from '../reducers/notify';

const store = createStore(combineReducers({
    mobileNav: MobileNavReducer,
    isAuthenticated: auth,
    showNotify: notify,
    userProfile: profile,
    cryptoListData: cryptoList,
    userNotification: notification
}));

export default store;