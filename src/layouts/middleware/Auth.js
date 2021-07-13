import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//Auth component
const Auth = ({component: Component, isAuth, ...rest}) => (
    <Route 
        {...rest}
        render={props =>
            isAuth === true ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuth: state.isAuthenticated
});

export default connect(mapStateToProps)(Auth);
