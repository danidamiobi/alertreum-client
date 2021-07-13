import http from '../http';

const setAuthHeader = token => {
    if(token) {
        http.defaults.headers.common['Authorization'] = token;
    } else {
        delete http.defaults.headers.common['Authorization']
    }
};

export default setAuthHeader;