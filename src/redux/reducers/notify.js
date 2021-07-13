import { SET_NOTIFY } from '../types';

const notifications = [];

const notify = (state = notifications, action) => {
    switch(action.type) {
        case SET_NOTIFY:
            return action.notification;
        default:
            return state
    }
}

export default notify