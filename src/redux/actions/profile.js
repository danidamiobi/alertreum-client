import { PROFILE } from '../types';

export const profileAction = payload => ({
    type: PROFILE,
    user: payload
});