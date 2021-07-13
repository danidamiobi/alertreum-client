import { SET_NOTIFY } from '../types';

export const setNofity = payload => ({
    type: SET_NOTIFY,
    notification: payload
});
