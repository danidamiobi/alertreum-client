import { CRYPTOLIST } from '../types';

const crytoListPrices = [];

const crypto = (state = crytoListPrices, action) => {
    switch(action.type) {
       case CRYPTOLIST:
           return state = action.crytoListPrices;
        default:
            return state 
    }
}

export default crypto;