import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import http from '../../http';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import './style.css';

const ConfirmPayment = props => {
    const alert = useAlert();
    const [isLoading, setIsLoading] = useState(true);
    const [transaction, setTransaction] = useState({
        isTransactionMade: false,
        transactionData: '',
        transactionError: false
    })
    useEffect(() => {
        const checkConfirmation = async () => {
            try {
                const paymentConfirmation = await http.post('/confirm-user-payment', {
                    transactionID: props.location.search.slice(-7)
                });

                const paymentDetails = JSON.parse(paymentConfirmation.data.confirmDetails);

                // Compares the values
                const compare = await http.get('/compare-payment-values');

                // Condition to confirm payment
                const paymentCondition = compare.data.amountToBePaid.toString() === paymentDetails.data.amount.toString() && paymentDetails.status.toString() === 'success' && paymentDetails.message === 'Transaction fetched successfully';

                if (paymentCondition) {
                    // Makes final confirmation if conditions were met
                    const confirmPaymentProcess = await http.post('/final-confirmation', {
                        creditAccount: paymentDetails.data.amount
                    });

                    setIsLoading(false);

                    setTransaction({
                        isTransactionMade: true,
                        transactionData: confirmPaymentProcess.data.message,
                        transactionError: false
                    });

                    alert.success(confirmPaymentProcess.data.paymentStatus);

                    setTimeout(() => {
                        window.location.href = '/payment-history'
                    }, 1000 * 5);
                    
                } else {
                    setIsLoading(false);
                    setTransaction({
                        isTransactionMade: false,
                        transactionData: 'Process failed',
                        transactionError: true
                    })
                }
            } catch (error) {
                setIsLoading(false);
                setTransaction({
                    isTransactionMade: false,
                    transactionData: 'Process failed',
                    transactionError: true
                })
                console.log(error)
            }
        }
        checkConfirmation();
    }, [alert, props.location.search])
    return (
        <div id="confirm-payment">
            {isLoading ? (
                <div className="mt-5 pt-5">
                    <div className="mt-5 pt-5">
                        <Loader
                            label="Confirming payments, please don't go offline or leave this page...."
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-5">
                        <div>
                            {transaction.isTransactionMade && (
                                <div className="alert alert-success">
                                    <h3 className="font-weight-bold">
                                        {transaction.transactionData}
                                    </h3>
                                </div>
                            )}
                            {
                                transaction.transactionError && (
                                    <div>
                                        <div className="alert alert-danger">
                                            <h3 className="font-weight-bold">
                                                {transaction.transactionData}
                                            </h3>
                                        </div>
                                        <div className="d-flex justify-content-center mt-5">
                                            <a href="/">
                                                <Button
                                                    className="btn pr-4 font-weight-bold"
                                                    variant="primary"
                                                    label="Go home"
                                                    textColor="white"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ConfirmPayment;