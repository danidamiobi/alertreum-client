import { PROFILE } from '../types';

const user = {
    email: '',
    id: '',
    name: '',
    phoneNumber: '',
    stakings: ''
};

const profile = (state = user, action) => {
    switch(action.type) {
        case PROFILE:
            return action.user
        default:
            return state
    }
}

export default profile