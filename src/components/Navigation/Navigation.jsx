import { connect } from 'react-redux';
import store from '../../redux/store';
import { mobileNavAction } from '../../redux/actions/mobile-nav';
import './style.css';

const Navigation = props => {
    const handleCloseMenu = () => {
        store.dispatch(mobileNavAction())
    }
    return (
        <nav id="navigation">
            <div className="d-flex">
                <div className="col-lg-2" id="left-side">
                    <h3 className="px-4 py-3 font-weight-bold" id="product-label">Alertrium</h3>
                    <span className="fa fa-navicon" id="nav-menu-icon" onClick={handleCloseMenu}></span>
                </div>
                <div className="col-lg-10 py-3 d-flex" id="right-side">
                    <div className="col-lg-10"></div>
                   <div className="col-lg-12">
                       <a href="/notifications">
                            <span className="fa fa-bell white mt-2 icon-xs" id="notification"></span>
                            {props.isNotified.isNotification && props.isNotified.userId === props.userProfile.id && (<div className="notifiy"></div>)}
                       </a>
                       <a href="/settings">
                        <span className="fa fa-cog white mt-2 ml-2 icon-xs" id="settings"></span>
                       </a>
                   </div>
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = state => ({
    navNotify: state.showNotify,
    userProfile: state.userProfile
})

export default connect(mapStateToProps)(Navigation)