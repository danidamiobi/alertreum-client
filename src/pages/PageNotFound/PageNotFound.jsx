import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PageNotFoundImage from './page-not-found.png';
const PageNotFound = () => {
    return (
        <div className="pt-1">
            <div className="container mt-5">
                <div className="mx-auto col-lg-7 pb-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="mt-4">
                                    <h1 style={{fontSize: '48px'}} className="font-weight-bold text-center gray">
                                        4O4
                                    </h1>
                                </div>
                            <div className="d-flex justify-content-center">
                                <img style={{width: '100%'}} src={PageNotFoundImage} alt="error" />
                            </div>
                            <div className="mt-3">
                                <div className="text-center" style={{fontSize: '19px'}}>
                                    The page you requested can not be found, please try a different rount!
                                </div>
                            </div>
                            <div className="mt-5 d-flex justify-content-center">
                                <Link to="/">
                                    <Button
                                        label="Go home"
                                        className="btn px-5 font-weight-bold"
                                        variant="primary"
                                        textColor="white"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PageNotFound;