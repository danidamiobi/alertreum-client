import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cookie from 'js-cookie';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import globalStore from './redux/store';
import Layouts from './layouts/Layouts';
import setAuthHeader from './utils/setAuth';
import { isLoggedIn, isNotLoggedIn } from './redux/actions/auth';
import './index.css';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const token = Cookie.get('alertrium-user');
  if (!token) {
      setAuthHeader();
      globalStore.dispatch(isNotLoggedIn())
  } else {
    setAuthHeader(JSON.parse(token));
    globalStore.dispatch(isLoggedIn())
}

const Alertrium = () => {
  return (
    <Provider store={globalStore}>
      <AlertProvider
        template={AlertTemplate}
        {...options}
      >
        <React.Fragment>
          <Layouts />
        </React.Fragment>
      </AlertProvider>
    </Provider>
  )
}

ReactDOM.render(<Alertrium />, document.querySelector('#root'));