import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import './style.css';

const Dashboard = props => {
    const history = useHistory();

    const [searchString, setSearchString] = useState('');

    // Stakings function
    const watchListData = (coinSymbol, coinName, coinPrice) => {
        localStorage.setItem('watchlist', JSON.stringify({
            symbol: coinSymbol,
            coin: coinName,
            price: coinPrice
        }));
    };

    // Prevents the form from submitting or reloading the browser
    const preventFormSubmit = event => {
        event.preventDefault()
    }

    // Search for a crypto currency
    const handleSearchCoin = event => {
        setSearchString(event.target.value)
    }

    const coinStructure = [
        {
            name: 'Symbol',
            selector: 'symbol',
            sortable: true,
            cell: row => {
                return (
                    <div className="text-color">
                        {row.symbol}
                    </div>
                )
            }
        },
        {
            name: 'Coin',
            selector: 'coin',
            sortable: true,
            cell: row => {
                return (
                    <div className="text-color">
                        {row.name}
                    </div>
                )
            }
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
            cell: row => {
                return (
                    <div className="text-color">
                        <strong>$</strong>{row.quote.USD.price.toLocaleString()}
                    </div>
                )
            }
        },
        {
            name: 'Add list',
            button: true,
            cell: row => {
                return (
                    <div>
                        <a href="/create-watchlist">
                            <Button
                                variant="primary"
                                className="btn font-weight-bold"
                                label="Select"
                                textColor="white"
                                onClick={() => {
                                    watchListData(row.symbol, row.name, row.quote.USD.price)
                                }}
                                onContextMenu={() => {
                                    watchListData(row.symbol, row.name, row.quote.USD.price)
                                }}
                            />
                        </a>
                    </div>
                )
            }
        }
    ];

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
    })

    return (
        <div className="container mt-3 pt-4" id="dashboard">
            { props.cryptoListData.length === 0 ? (
                <div className="mt-5 pt-5">
                    <div className="mt-5">
                        <Loader 
                            label="Fetching cryto lists....."
                        />
                    </div>
                </div>
            ):(
                <div className="card mt-4" id="cryptos">
                    <div className="card-body">
                        <h4 className="gray font-weight-bold pb-3">Cryptos</h4>
                        <div className="pb-3">
                            <form onSubmit={preventFormSubmit}>
                                <input
                                    type="text"
                                    className="form-control col-lg-12 font-weight-bold py-4"
                                    placeholder="Search coin with up and lower case (i.e Bitcoin Cash, Binance Coin)....."
                                    onChange={handleSearchCoin}
                                />
                            </form>
                        </div>
                        <Table
                            columns={coinStructure}
                            data={props.cryptoListData.filter(i => i.name.includes(searchString))}
                            pagination={true}
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

const mapStateToProps = state => ({
    cryptoListData: state.cryptoListData,
    searchCoinData: state.searchCoin
});

export default connect(mapStateToProps)(Dashboard);