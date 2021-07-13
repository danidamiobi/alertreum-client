import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import http from '../../http';
import TopSection from '../../components/TopSection/TopSection';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import './style.css';

const ViewUsers = () => {
    const history = useHistory();
    const alert = useAlert();

    const [users, setUsers] = useState([]);

    const [isUserLoaded, setIsUsersLoaded] = useState(false);

    const deleteUser = async id => {
        try {
            const deleteUser = await http.delete(`/delete-user/${id}`);
            alert.success(deleteUser.data.message);
            setTimeout(() => { window.location.href = '/users' }, 1234);
        }
        catch (error) {
            alert.error('Could not delete user')
            console.log(error)
        }
    }

    const confirmDelete = id => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'Doing this will delete this user',
            buttons: [
                {
                    label: 'Yes, delete',
                    onClick: () => {
                        deleteUser(id)
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    useEffect(() => {
        if (!Cookie.get('alertrium-user')) {
            return history.push('/login')
        }

        const handleViewUsers = async () => {
            if (!Cookie.get('alertrium-user')) {
                return history.push('/login')
            }

            try {
                const users = await http.get('/users');
                console.log(users);
                setUsers(users.data);
                setIsUsersLoaded(true);
            } catch(error) {
                console.log(error);
                setIsUsersLoaded(true)
            }

        }
        handleViewUsers()
    }, [history]);

    return (
        <div className="col-lg-12 mt-5" id="profile-page">
            {
                !isUserLoaded ? (
                    <div className="mt-5 pt-5">
                        <div className="mt-5 pt-5">
                            <Loader label="Fetching your details...." />
                        </div>
                    </div>
                ) : (
                    <div>
                        <TopSection
                            label="View Users"
                            icon="fa fa-users"
                        />
                        <div className="mt-4">
                           {
                               users.map((data, index) => {
                                   return !data.superUser && <div className="card round-card mt-4" key={index}>
                                       <div className="row pt-4">
                                          <div className="col-lg-6">
                                              <ul>
                                                  <li>Name: {data.name}</li>
                                                  <li>Email: {data.email}</li>
                                                  <li>Phone: {data.phoneNumber}</li>
                                                  <li>Balance: {data.payments.accountBalance}</li>
                                              </ul>
                                          </div>
                                          <div className="col-lg-6 pb-4">
                                                <Button
                                                    variant="danger"
                                                    label="Delete"
                                                    textColor="white"
                                                    className="px-3 py-2 float-right mr-4"
                                                    onClick={() => confirmDelete(data._id)}
                                                />
                                          </div>
                                       </div>
                                   </div>
                               })
                           }
                           {
                               users.length === 1 && <div className="card card-body round-card">
                                   <h3 className="font-weight-bold gray pt-1">No users</h3>
                               </div>
                           }
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default ViewUsers;