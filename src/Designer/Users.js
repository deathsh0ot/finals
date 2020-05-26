import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';

export default class Users extends Component {
    state = {
        newUserModal: false,
        EditUserModal: false,
        users: [],
        newUserData: {
            username: '',
            password: '',
            userType: '',
            email: '',
            phoneNumber: '',
            nic: '',
        },
        editedUserData: {
            id: '',
            username: '',
            password: '',
            userType: '',
            email: '',
            phoneNumber: '',
            nic: '',
        },
    }
    togglenewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal,
        });
    }
    toggleEditUserModal() {
        this.setState({
            EditUserModal: !this.state.EditUserModal,
        });
    }
    componentWillMount() {
        this._refreshUsers();
    }
    //function that adds a new user into the base
    addUser() {
        axios.post('http://smart.com/appusers', this.state.newUserData).then((response) => {
            //updating the users object and closing the modal as well as resetting the newUserData object
            let { users } = this.state;
            //Object.values(users).push(response.data); Need to fix this bolth users and response.data are objects
            //users=response.data; false doesn't work
            this._refreshUsers(); //isn't efficient should look for a better method
            this.setState({
                users, newUserModal: false, newUserData: {
                    username: '',
                    password: '',
                    userType: '',
                    email: '',
                    phoneNumber: '',
                    nic: '',
                }
            });
        });
    }
    //function that updates the user
    updateUser() {
        let { username, password, userType, email, phoneNumber, nic } = this.state.editedUserData
        axios.put('http://smart.com/appusers/' + this.state.editedUserData.id, {
            username, password, userType, email, phoneNumber, nic
        }).then((response) => {
            this._refreshUsers();
            this.setState({
                EditUserModal: false, editedUserData: {
                    id: '',
                    username: '',
                    password: '',
                    userType: '',
                    email: '',
                    phoneNumber: '',
                    nic: '',
                }
            });
            console.log(response.data);
        });
    }
    //reloads the users List

    //function that edits the user
    editUser(id, username, password, userType, email, phoneNumber, nic) {
        this.setState({
            editedUserData: { id, username, password, userType, email, phoneNumber, nic }, EditUserModal: !this.state.EditUserModal
        });
    }
    deleteUser(id) {
        axios.delete('http://smart.com/appusers/' + id).then((response) => {
            this._refreshUsers();
        });
    }
    _refreshUsers() {
        axios.get('http://smart.com/appusers').then((response) => {
            console.log(response.data)
            this.setState({
                users: response.data,

            })

        });
    }
    render() {
        //Object.values converts the users object variable into an array
        let users = Object.values(this.state.users).map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.userType}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.nic}</td>
                    <td>
                        <button className="btn btn-success mr-2" size="sm" onClick={this.editUser.bind(this, user.id, user.username, user.password, user.userType, user.email, user.phoneNumber, user.nic)}>Edit</button>
                        <button className="btn btn-danger" size="sm" onClick={this.deleteUser.bind(this, user.id)}>Delete</button>
                    </td>

                </tr>
            )
        });
        return (
            <div>
                <div>
                    <Button color="primary" onClick={this.togglenewUserModal.bind(this)}>Add a new User</Button>
                    <Modal isOpen={this.state.newUserModal} toggle={this.togglenewUserModal.bind(this)} >
                        <ModalHeader toggle={this.togglenewUserModal.bind(this)}>Add new User</ModalHeader>
                        <ModalBody>
                            <div className="card card-danger">
                                <div className="card-header">USER FORM</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                            value={this.state.newUserData.username}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.username = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            value={this.state.newUserData.password}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.password = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="User type">User type</label>
                                        <input
                                            type="text"
                                            name="userType"
                                            id="userType"
                                            className="form-control"
                                            value={this.state.newUserData.userType}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.userType = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="E-mail">E-mail</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            value={this.state.newUserData.email}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.email = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Phone number">Phone number</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            className="form-control"
                                            value={this.state.newUserData.phoneNumber}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.phoneNumber = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NIC">NIC</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            id="nic"
                                            className="form-control"
                                            value={this.state.newUserData.nic}
                                            onChange={(e) => {
                                                let { newUserData } = this.state;
                                                newUserData.nic = e.target.value;
                                                this.setState({ newUserData });
                                            }

                                            }
                                        />
                                    </div>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addUser.bind(this)}>Add user</Button>{' '}
                            <Button color="secondary" onClick={this.togglenewUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.EditUserModal} toggle={this.toggleEditUserModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit User</ModalHeader>
                        <ModalBody>
                            <div className="card card-danger">
                                <div className="card-header">USER FORM</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                            value={this.state.editedUserData.username}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.username = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            value={this.state.editedUserData.password}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.password = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="User type">User type</label>
                                        <input
                                            type="text"
                                            name="userType"
                                            id="userType"
                                            className="form-control"
                                            value={this.state.editedUserData.userType}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.userType = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="E-mail">E-mail</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            value={this.state.editedUserData.email}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.email = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Phone number">Phone number</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            className="form-control"
                                            value={this.state.editedUserData.phoneNumber}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.phoneNumber = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NIC">NIC</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            id="nic"
                                            className="form-control"
                                            value={this.state.editedUserData.nic}
                                            onChange={(e) => {
                                                let { editedUserData } = this.state;
                                                editedUserData.nic = e.target.value;
                                                this.setState({ editedUserData });
                                            }

                                            }
                                        />
                                    </div>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateUser.bind(this)}>Update user</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>

                    </Modal>
                </div>
                <div className="card">
                    <div className="card-header"><h3 className="card-title">Users</h3>
                    </div>
                    <div className="card-body">
                        <div className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6"></div>
                                <div className="col-sm-12 cold-md-6"></div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <table id="Users Table" className="table table-bordered table-hover dataTable">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Username</th>
                                                <th>User Type</th>
                                                <th>E-mail</th>
                                                <th>Phone number</th>
                                                <th>NIC</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                            <ul className="pagination">
                                <li class="paginate_button page-item previous" id="example2_previous"><a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
                                
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
