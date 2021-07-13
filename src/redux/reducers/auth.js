import { LOGIN, LOGOUT } from '../types';

const auth = (state = false, action) => {
    switch(action.type) {
       case LOGIN:
           return state = action.isLoggedIn;
       case LOGOUT:
           return state = action.isLoggedOut;
        default:
            return state 
    }
}

export default auth