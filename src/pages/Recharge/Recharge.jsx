import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import TopSection from '../../components/TopSection/TopSection';
import Button from '../../components/Button/Button';
import http from '../../http';
import './style.css';

const Recharge = () => {
    const history = useHistory();
    const [showAccout, setShowAccount] = useState(false);
    const [accountBalace, setAccountBalance] = useState(0);
    const [loadingToCheckBalance, setLoadingToCheckBalance] = useState(false);
    const [loadingToMakePayments, setLoadingToMakePayment] = useState(false);

    const [error, setError] = useState({
        isError: false,
        displayError: ''
    });

    // Custom button object
    const buttonPropertiesAndActions = {
        label: 'Account balance',
        variant: 'primary',
        className: 'btn font-weight-bold pb-2 ml-4',
        textColor: 'white',
        icon: 'fa fa-dollar'
    }

    const proceedWithPayment = async event => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        event.preventDefault();
        setLoadingToMakePayment(true);
        const rechargeAmount = event.target.amount.value;
        try {
            const response = await http.post('/recharge', {
                amount: rechargeAmount
            });
            setLoadingToMakePayment(false);
            console.log(response.data.paymentRedirectURL);
            window.location.href = response.data.paymentRedirectURL;
            setError({
                isError: false,
                displayError: ''
            })
        } catch (error) {
            setLoadingToMakePayment(false);
            console.log(error);
            setError({
                isError: true,
                displayError: "Could not make payments please try again!"
            })
        }
    }

    const checkAccountBalance = async () => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        setLoadingToCheckBalance(true);
        try {
            const userAccountBalance = await http.get('/check-account-balance');
            setLoadingToCheckBalance(false);
            setAccountBalance(userAccountBalance.data.accountBalance);
            setShowAccount(true);
        }
        catch (error) {
            setLoadingToCheckBalance(false);
            console.log(error);
            setShowAccount(false);
        }
    }

    const removeBalanceDetails = () => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        setShowAccount(false);
    }

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
    }, [])

    return (
        <div id="recharge">
            <div>
                <TopSection
                    label="Recharge"
                    icon="fa fa-dollar"
                    buttonProperties={buttonPropertiesAndActions}
                    functionCall={checkAccountBalance}
                    loading={loadingToCheckBalance}
                    disabled={loadingToCheckBalance}
                />
            </div>
            <div className="card round-card mt-4 py-2">
                <div className="card-body">
                    {showAccout && (
                        <div className="alert alert-primary px-0">
                            <div className="d-flex px-0">
                                <div className="col-lg-11">
                                    <span className="font-weight-bold">
                                        Your account balance is ₦{accountBalace.toLocaleString()}
                                    </span>
                                </div>
                                <div className="col-lg-1">
                                    <span
                                        style={{ float: 'right' }}
                                        className="fa fa-close cursor-pointer"
                                        onClick={removeBalanceDetails}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        error.isError && (
                            <div className="alert alert-danger font-weight-bold">{error.displayError}</div>
                        )
                    }
                    <form onSubmit={proceedWithPayment}>
                        <div>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Recharge amount in naira"
                                className="form-control col-lg-12 font-weight-bold py-4"
                            />
                        </div>
                        <div>
                            <center>
                                <Button
                                    variant="primary"
                                    label="Proceed"
                                    className="pr-4 mt-4 font-weight-bold mt-3 py-2 btn"
                                    textColor="white"
                                    type="submit"
                                    disabled={loadingToMakePayments}
                                    loading={loadingToMakePayments}
                                />
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Recharge;