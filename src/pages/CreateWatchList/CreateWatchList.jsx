import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useAlert } from 'react-alert';
import http from '../../http';
import store from '../../redux/store';
import { isNotLoggedIn } from '../../redux/actions/auth';
import Button from '../../components/Button/Button';
import './style.css';

const WatchList = () => {
    const history = useHistory();
    const alert = useAlert();

    const [currentStats, setCurrentStats] = useState({ symbol: '', coin: '', price: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const  {symbol, coin, price} = JSON.parse(localStorage.getItem('watchlist'))

    const stake = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const createDropRate = await http.post('/create-watchlist', {
                symbol: currentStats.symbol,
                coin: currentStats.coin,
                price: currentStats.price
            });
            
            alert.success(createDropRate.data.message)
            setLoading(false);
            console.log(createDropRate);
            window.location.href = '/watch-list';
            localStorage.removeItem('watchlist');
            setErrorMessage('');
            
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setLoading(false)
            if(error.response.status === 401) {
                store.dispatch(isNotLoggedIn());
                history.push('/login')
            }
        }
    }

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        
        const getCryptoSelected = () => {
            if(!symbol && !coin && !price) {
                window.location.href = '/watch-list';
                return false
            }
            setCurrentStats({
                symbol: symbol,
                coin: coin,
                price: price
            })
        }
        getCryptoSelected();
    }, [history, coin, price, symbol]);

    return (
        <div>
            <div className="mt-3 pt-5" id="stakings">
                <div className="card round-card">
                    <div className="card-body">
                        <h3 className="font-weight-bold gray">
                            Create watch list rate on {currentStats.coin}
                        </h3>
                        <h5 className="mt-4 font-weight-bold gray">{currentStats.symbol}</h5>
                    </div>
                </div>
                <div className="card round-card mt-3">
                    <div className="card-body">
                        <h3 className="font-weight-bold gray">
                            {currentStats.coin} Currently at ${currentStats.price}
                        </h3>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="card round-card pt-3 pb-3">
                        <div className="card-body">
                            {
                                errorMessage && (
                                    <div className="container-fluid pb-4">
                                        <div className="alert alert-danger font-weight-bold py-3">
                                            {errorMessage}
                                        </div>
                                    </div>
                                )
                            }
                            <form onSubmit={stake}>
                                <div className="container-fluid">
                                    <input
                                        type="text"
                                        name="price"
                                        className="form-control py-4"
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <Button
                                        variant="primary"
                                        className="btn font-weight-bold px-4 py-2"
                                        textColor="white"
                                        label="Set your drop rate"
                                        loading={loading}
                                        disabled={loading}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WatchList;