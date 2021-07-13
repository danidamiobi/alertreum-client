import { OPEN_CLOSE_NAV } from '../types'
const mobileNav = (state = false, action) => {
    switch(action.type) {
        case OPEN_CLOSE_NAV:
            return !state;
        default:
            return state
    }
}

export default mobileNav