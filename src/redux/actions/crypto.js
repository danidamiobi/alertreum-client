import { CRYPTOLIST } from '../types';

export const cryptoAction = payload => ({
    type: CRYPTOLIST,
    crytoListPrices: payload
})