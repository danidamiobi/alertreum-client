import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import http from '../../http';
import socket from '../../socket';
import { useHistory } from 'react-router-dom';
import TopSection from '../../components/TopSection/TopSection';
import Loader from '../../components/Loader/Loader';
import './style.css';

const Notification = () => {
    const history = useHistory();
    const [notifications, setNotifications] = useState([]);
    const [isNotification, setIsNotification] = useState(false);

    // Deletes all notifications
    const deleteNotificationInBulk = async () => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        try {
            await http.put('/delete-notifications-in-bulk');
        } catch (error) {
            console.log(error)
        }
    }

    // Reloads the page
    const reloadPage = () => {
        window.location.href = '/notifications';
        deleteNotificationInBulk();
    }

    // Custom button object
    const buttonPropertiesAndActions = {
        label: 'Delete notifications',
        variant: 'danger',
        className: 'btn font-weight-bold pb-2 ml-4',
        textColor: 'white',
        icon: 'fa fa-trash'
    }

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }
        
        // Live Notification
        const notifyUser = () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            socket.on('crypto', notification => {
                if (notification.action === 'notification') {
                    setNotifications(notification.data.notification);
                }
            })
        }

        notifyUser();

        // Existing Notification
        const existingNotification = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            try {
                const notification = await http('/notifications');
                setNotifications(notification.data.notifications);
                setIsNotification(true);
            } catch (error) {
                console.log(error)
            }
        }
        existingNotification()

        const cancelNotify = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }
            
            try {
                await http.post('/cancel-notification');
            } catch (error) {
                console.log(error)
            }
        }
        cancelNotify();
    }, [history])
    return (
        <div className="mt-4" id="notifications">
            {!isNotification ? (
                <div className="mt-5 pt-5">
                    <div className="mt-5 pt-5">
                        <Loader
                            label="Fetching notifications...."
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <TopSection
                            label="Notifications"
                            icon="fa fa-bell"
                            buttonProperties={buttonPropertiesAndActions}
                            functionCall={reloadPage}
                        />
                    </div>
                    <div className="mt-3">
                        <div className="mt-4">
                            <ul className="px-2 list-group">
                                {
                                    notifications.map((data, index) => {
                                        return (
                                            <li className="list-group-item" key={index}>
                                                <h4 className="font-weight-bold gray d-flex">
                                                    <div className="pt-1" style={{ width: '98%' }}>{data.message}</div>
                                                </h4>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Notification;