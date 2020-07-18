import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';

export default class Users extends Component {
    state = {
        newUserModal: false,
        EditUserModal: false,
        users: [],
        newUserData: {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            userType: 'Designer',
            username: '',
        },
        editedUserData: {
            username: '',
            password: '',
            userType: '',
            email: '',
            phoneNumber: '',
            username: '',
        },
        nic_phError: false,
        empty_Error: false,
        popoverOpen: false,
    }
    //Functionss!!

    //toggle functions
    toggleError() {
        this.setState({ nic_phError: !this.state.nic_phError });
    }
    toggleEmptyError() {
        this.setState({ empty_Error: !this.state.empty_Error });
    }
    togglenewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal,
        });
        //this is so the Error Alert disappears after closing the modal
        this.setState({
            empty_Error: false,
        });
        this.setState({
            nic_phError: false,
        });
    }
    toggleEditUserModal() {
        this.setState({
            EditUserModal: !this.state.EditUserModal,
        });
        //this is so the Error Alert disappears after closing the modal
        this.setState({
            empty_Error: false,
        });
        this.setState({
            nic_phError: false,
        });
    }
    componentDidMount() {
        this._refreshUsers();
    }

    //function that adds a new user into the base
    addUser() {

        if (this.state.newUserData.username === "" || this.state.newUserData.password === "" || this.state.newUserData.userType === "" || this.state.newUserData.email === "" || this.state.newUserData.phoneNumber === "" || this.state.newUserData.username === "") {
            this.setState({ empty_Error: true });
        }
        else {
            console.log(this.state.newUserData);
            axios.post('http://pfe.tn/user', this.state.newUserData).then((response) => {
                //updating the users object and closing the modal as well as resetting the newUserData object
                let { users } = this.state;
                console.log(response);
                //users.push(response.data._embedded.appusers); //isn't efficient should look for a better method
                this._refreshUsers();
                this.setState({
                    users, newUserModal: false,
                    newUserData: {
                        username: '',
                        password: '',
                        userType: 'Designer',
                        email: '',
                        phoneNumber: '',
                        username: '',
                    }
                });
            }).catch(error => {
                console.log("this is the error:",error);
                this.setState({ nic_phError: true });
                this._refreshUsers();
                this.setState({newUserModal:false,
                    newUserData: {
                        username: '',
                        password: '',
                        userType: 'Designer',
                        email: '',
                        phoneNumber: '',
                        username: '',
                    }})
            });
        }
    }

    //function that updates the user
    updateUser() {
        if (this.state.editedUserData.username === "" || this.state.editedUserData.password === "" || this.state.editedUserData.userType === "" || this.state.editedUserData.email === "" || this.state.editedUserData.phoneNumber === "" || this.state.editedUserData.username === "") {
            this.setState({ empty_Error: true });
        } else {
            //id changed here
            axios.put('http://pfe.tn/user/' + this.state.editedUserData.username, this.state.editedUserData)
            .then((response) => {
                this._refreshUsers();
                this.setState({
                    EditUserModal: false,
                    editedUserData: {
                        name: '',
                        password: '',
                        userType: '',
                        email: '',
                        phoneNumber: '',
                        username: '',
                    }
                });
                console.log(response.data);
            }).catch(error => {
                this.setState({ nic_phError: true });
            });
        }
    }
    //reloads the users List

    //function that edits the user
    editUser( name, password, userType, email, phoneNumber, username) {
        this.setState({
            editedUserData: { name, password, userType, email, phoneNumber, username }, EditUserModal: !this.state.EditUserModal
        });
    }
    //id changed here as well
    deleteUser(username) {
        axios.delete('http://pfe.tn/user/' + username).then((response) => {
            this._refreshUsers();
        });
    }
    _refreshUsers() {

        axios.get('http://pfe.tn/user').then((response) => {
            //this needs to be fixed (DATA-TABLE)
            const script = document.createElement("script");
            script.src = `dist/js/content.js`;
            script.async = true;
            document.body.appendChild(script);
            //-------------/DATA-TABLE
            this.setState({
                users: response.data._embedded.user,

            })

        });
    }
    render() {
        //Object.values converts the users object variable into an array
        let users = Object.values(this.state.users).map((user, index) => {
            index++
            return (
                <tr key={user.username}>
                    <td>{index}</td>
                    <td>{user.name}</td>
                    <td>{user.userType}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.username}</td>
                    <td>
                        <button className="btn btn-success mr-2" size="sm" onClick={this.editUser.bind(this, user.name, user.password, user.userType, user.email, user.phoneNumber, user.username)}>Edit</button>
                        <button className="btn btn-danger" size="sm" 
                        onClick={() => { if (window.confirm('Are you sure you want to delete this user?')){let deleteUser = this.deleteUser.bind(this, user.username); deleteUser(); }}}>Delete</button>
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
                                    <AvForm >
                                        <div className="form-group">
                                            <AvField
                                                label="Username"
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="form-control"
                                                value={this.state.newUserData.name}
                                                onChange={(e) => {
                                                    let { newUserData } = this.state;
                                                    newUserData.name = e.target.value;
                                                    this.setState({ newUserData });
                                                }

                                                }
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a name' },
                                                    pattern: { value: '^[A-Za-z0-9 " " ]+$', errorMessage: 'the name must be composed only with letter and numbers' },
                                                    minLength: { value: 6, errorMessage: 'the name must be between 6 and 35 characters' },
                                                    maxLength: { value: 35, errorMessage: 'the name must be between 6 and 35 characters' }
                                                }}

                                            />

                                            <AvField
                                                label="Password"
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
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a password' },
                                                    //pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'The password must be composed only with letter and numbers'},
                                                    minLength: { value: 8, errorMessage: 'The password must be between 8 and 25 characters' },
                                                    maxLength: { value: 25, errorMessage: 'The password must be between 8 and 25 characters' }
                                                }}

                                            />

                                            <AvField
                                                label="User type"
                                                type="select"
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
                                                required
                                            >
                                                <option >Designer</option>
                                                <option>Project Holder</option>
                                            </AvField>

                                            <AvField
                                                label="E-mail"
                                                type="email"
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
                                                required
                                            />

                                            <AvField
                                                label="Phone number"
                                                type="integer"
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
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a phone number' },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'The phone number must be composed only of numbers' },
                                                    minLength: { value: 8, errorMessage: 'invalid phone number, it must contain 8 numbers' },
                                                    maxLength: { value: 8 }
                                                }}

                                            />

                                            <AvField
                                                label="NIC"
                                                type="text"
                                                name="nic"
                                                id="nic"
                                                className="form-control"
                                                value={this.state.newUserData.username}
                                                onChange={(e) => {
                                                    let { newUserData } = this.state;
                                                    newUserData.username = e.target.value;
                                                    this.setState({ newUserData });
                                                }

                                                }
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a National Identity card(NIC/CIN) number' },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'The (NIC/CIN) card number must be composed only of numbers' },
                                                    minLength: { value: 8, errorMessage: 'invalid (NIC/CIN) card number, it must contain 8 numbers' },
                                                    maxLength: { value: 8 }
                                                }}

                                            />

                                        </div>
                                        <div>
                                            <Alert color="danger" isOpen={this.state.nic_phError} toggle={this.toggleError.bind(this)}>Please make sure to fill all fields correctly and MAKE SURE THAT THE PHONE NUMBER AND/OR NIC DON'T ALREADY EXIST.</Alert>
                                        </div>
                                        <div>
                                            <Alert color="danger" isOpen={this.state.empty_Error} toggle={this.toggleEmptyError.bind(this)}>Please fill out all input fields</Alert>
                                        </div>
                                    </AvForm>

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
                            <div className="card card-primary">
                                <div className="card-header">USER FORM</div>
                                <div className="card-body">
                                    <AvForm>
                                        <div className="form-group">
                                            <AvField
                                                label="Username"
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="form-control"
                                                value={this.state.editedUserData.name}
                                                onChange={(e) => {
                                                    let { editedUserData } = this.state;
                                                    editedUserData.name = e.target.value;
                                                    this.setState({ editedUserData });
                                                }

                                                }
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a name' },
                                                    pattern: { value: '^[A-Za-z0-9 " " ]+$', errorMessage: 'the name must be composed only with letter and numbers' },
                                                    minLength: { value: 6, errorMessage: 'the name must be between 6 and 35 characters' },
                                                    maxLength: { value: 35, errorMessage: 'the name must be between 6 and 35 characters' }
                                                }}

                                            />

                                            <AvField
                                                label="Password"
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
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a password' },
                                                    //pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'The password must be composed only with letter and numbers'},
                                                    minLength: { value: 8, errorMessage: 'The password must be between 8 and 25 characters' },
                                                    maxLength: { value: 25, errorMessage: 'The password must be between 8 and 25 characters' }
                                                }}
                                            />

                                            <AvField
                                                label="User type"
                                                type="select"
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
                                                required
                                            >
                                                <option>Designer</option>
                                                <option>Project Holder</option>
                                            </AvField>

                                            <AvField
                                                label="E-mail"
                                                type="email"
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
                                                required
                                            />

                                            <AvField
                                                label="Phone number"
                                                type="integer"
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
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a phone number' },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'The phone number must be composed only of numbers' },
                                                    minLength: { value: 8, errorMessage: 'invalid phone number, it must contain 8 numbers' },
                                                    maxLength: { value: 8 }
                                                }}
                                            />

                                            <AvField
                                                label="NIC"
                                                type="text"
                                                name="nic"
                                                id="nic"
                                                className="form-control"
                                                value={this.state.editedUserData.username}
                                                onChange={(e) => {
                                                    let { editedUserData } = this.state;
                                                    editedUserData.username = e.target.value;
                                                    this.setState({ editedUserData });
                                                }

                                                }
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a National Identity card(NIC/CIN) number' },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'The (NIC/CIN) card number must be composed only of numbers' },
                                                    minLength: { value: 8, errorMessage: 'invalid (NIC/CIN) card number, it must contain 8 numbers' },
                                                    maxLength: { value: 8 }
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Alert color="danger" isOpen={this.state.nic_phError} toggle={this.toggleError.bind(this)}>Please make sure to fill all fields correctly and MAKE sure that the PHONE NUMBER AND/OR NIC DON'T ALREADY EXIST.</Alert>
                                        </div>
                                        <div>
                                            <Alert color="danger" isOpen={this.state.empty_Error} toggle={this.toggleEmptyError.bind(this)}>Please fill out all input fields</Alert>
                                        </div>
                                    </AvForm>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateUser.bind(this)}>Update user</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                        </ModalFooter>

                    </Modal>
                </div>

                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header"><h3 className="card-title">Users</h3>
                                </div>
                                <div className="card-body">




                                    <table id="example2" className="table table-bordered table-hover" >
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
                                        <tfoot>
                                            <tr>
                                                <td>#</td>
                                                <td>Username</td>
                                                <td>User Type</td>
                                                <td>E-mail</td>
                                                <td>Phone number</td>
                                                <td>NIC</td>
                                                <td>Action</td>
                                            </tr>
                                        </tfoot>
                                    </table>



                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
