import openSocket from 'socket.io-client';
import { webSocketURL } from './helpers/base_url';

const socket = openSocket(webSocketURL, {
    transports: ['websocket', 'polling', 'flashsocket']
});

export default socket;