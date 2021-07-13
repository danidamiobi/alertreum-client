import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import Cookie from 'js-cookie';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import TopSection from '../../components/TopSection/TopSection';
import http from '../../http';
import Loader from '../../components/Loader/Loader';
import './style.css'

const WatchList = () => {
    const history = useHistory();
    const alert = useAlert();
    const [watchList, setWatchList] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [isWatchListShown, setIsWatchListShown] = useState(false);

    // Removes a drop rate
    const handleRemoveWatchList = async coinName => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        confirmAlert({
            title: 'Please confirm!',
            message: `Are you sure you want to remove ${coinName} drop rate?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        http.put('/delete-watchlist', {
                            coin: coinName
                        }).then(removeWatchList => {
                            alert.success(removeWatchList.data.message);
                            setWatchList(removeWatchList.data.data);
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    // Searches for a drop rate
    const handleSearchDropRate = event => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        setSearchString(event.target.value);
    }

    // Prevents the form from submitting a drop rate
    const preventFormSubmit = event => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        event.preventDefault();
    }

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        const getCurrentUserWatchLists = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }
            try {
                const watchList = await http('/get-watchlists');
                setIsWatchListShown(true);
                console.log(watchList.data);
                setWatchList(watchList.data.watchLists);
            } catch (error) {
                console.log(error)
            }
        }
        getCurrentUserWatchLists();
    }, [watchList, history])

    return (
        <div>
            {
                !isWatchListShown ? (
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-3">
                            <Loader
                                label="Fetching your watch lists...."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="px-3" id="watchlist">
                        <div>
                            <TopSection
                                label="Watch list"
                                icon="fa fa-eye"
                            />
                        </div>
                        <div className="card mt-4 pb-4 round-card">
                            <div className="card-body">
                                <h4 className="mt-4 gray font-weight-bold">Remove watch list</h4>
                                <div className="py-3">
                                    <form onSubmit={preventFormSubmit}>
                                        <input
                                            type="text"
                                            className="form-control col-lg-12 font-weight-bold py-4"
                                            placeholder="Search watchlist...."
                                            onChange={handleSearchDropRate}
                                        />
                                    </form>
                                </div>
                                <div className="pt-3">
                                    <ul className="list-group">
                                        {
                                            watchList.filter(i => i.coin.includes(searchString)).map((data, index) => {
                                                return (
                                                    <li className="list-group-item" key={index}>
                                                        <div className="font-weight-bold gray d-flex">
                                                            <div className="pt-1" style={{ width: '98%' }}>
                                                                <div className="row">
                                                                    <div className="col-lg-3">
                                                                        {data.symbol}
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        {data.coin}
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        {parseFloat(data.price).toLocaleString()}
                                                                    </div>
                                                                    <div className="col-lg-1">
                                                                        <span className="fa fa-close mt-1 cursor-pointer"
                                                                            title="Remove drop rate"
                                                                            onClick={() => handleRemoveWatchList(data.coin)}></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default WatchList;