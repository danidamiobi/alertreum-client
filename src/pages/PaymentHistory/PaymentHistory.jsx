import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Cookie from 'js-cookie';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAlert } from 'react-alert';
import http from '../../http';
import TopSection from '../../components/TopSection/TopSection';
import Loader from '../../components/Loader/Loader';
import './style.css';

const PaymentHistory = () => {
    const alert = useAlert();
    const history = useHistory();

    const [accountBalance, setAccountBalance] = useState(0);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loadingHistoryPayment, setLoadingHistoryPayment] = useState(true);

    const deletePaymentHistory = async () => {
        await http.post('/delete-payment-history');
        window.location.href = '/payment-history';
    };

    const useModalToViewBalance = () => {
        confirmAlert({
            title: 'Your account balance',
            message: `₦${accountBalance.toLocaleString()}`,
            buttons: [
                {
                    label: 'Want to recharge ?',
                    onClick: () => {
                        window.location.href = '/recharge';
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const buttonPropertiesAndActions = {
        label: 'Delete histories',
        variant: 'danger',
        className: 'btn font-weight-bold pb-2 ml-4',
        textColor: 'white',
        icon: 'fa fa-trash'
    };

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        
        const getAccountBalance = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            try {
                const userAccountBalance = await http.get('/check-account-balance');
                setAccountBalance(userAccountBalance.data.accountBalance);
                setLoadingHistoryPayment(false);
            }
            catch (error) {
                console.log(error);
                alert.error('Operation failed');
                setLoadingHistoryPayment(false);
            }
        }
        getAccountBalance();

        const paymentHistory = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            try {
                const allPaymentMade = await http.get('/payment-history');
                setPaymentHistory(allPaymentMade.data.paymentHistory);
                setLoadingHistoryPayment(false);
            }
            catch (error) {
                console.log(error);
                alert.error('Operation failed');
                setLoadingHistoryPayment(false);
            }
        }
        paymentHistory();

    }, [alert]);

    return (
        <div id="payment-history">
            {
                loadingHistoryPayment ? (
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-5">
                            <Loader label="Loading your payment history...." />
                        </div>
                    </div>
                ) : (
                    <div className="mt-5">
                        <TopSection
                            label="Payment History"
                            icon="fa fa-dollar"
                            buttonProperties={buttonPropertiesAndActions}
                            functionCall={deletePaymentHistory}
                        />
                        <div style={{ marginTop: '-23px' }}>
                            <TopSection
                                label={`Account balance: ${accountBalance.toString().length > 25 ? `₦${accountBalance.toString().toLocaleString().slice(5)}...` : `₦${accountBalance.toLocaleString()}`}`}
                                functionCall={accountBalance.toString().length > 25 ? useModalToViewBalance : null}
                            />
                        </div>
                        {
                            paymentHistory.length === 0 ? (
                                <div className="mt-4 alert alert-info round-card">
                                    <h3>You have no payment history!</h3>
                                </div>
                            ) : (
                                <div className="card round-card mt-4">
                                    <div className="card-body">
                                        <ul className="list-group">
                                            {
                                                paymentHistory.map((data, index) => {
                                                    return (
                                                        <li className="list-group-item" key={index}>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="font-weight-bold gray">
                                                                        ₦{data.amount.toLocaleString().length > 30 ? `${data.amount.toLocaleString().slice(10)}....` : `${data.amount.toLocaleString()}`}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="font-weight-bold gray">{data.datePaid}</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default PaymentHistory;
