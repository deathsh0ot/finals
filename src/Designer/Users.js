import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';

export default class Users extends Component {
    state = {
        newUserModal: false,
        Users: []
    }
    togglenewUserModal() {
        this.setState({ 
            newUserModal: !this.state.newUserModal, 
        });
    }
    componentWillMount(){
       axios.get('http://localhost:80/Smart_Cursus/public/appusers').then((response) => {
           this.setState({
              Users: response.data
           })
       });
    }

    render() {
        let Users = this.state.Users.map((User) =>{
           return(
            <tr key={User.id}>
            <td>{User.id}</td>
            <td>{User.username}</td>
            <td>{User.userType}</td>
            <td>{User.email}</td>
            <td>{User.phoneNumber}</td>
            <td>{User.nic}</td>
            <td>
                <button className="btn btn-success" size="sm">Edit</button>
                <button className="btn btn-danger" size="sm">Delete</button>
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
                                        <label htmlFor="userName">User name</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            id="userName"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="NIC">NIC</label>
                                        <input
                                            type="text"
                                            name="NIC"
                                            id="NIC"
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit" className="btn btn-danger" />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.togglenewUserModal.bind(this)}>Add user</Button>{' '}
                            <Button color="secondary" onClick={this.togglenewUserModal.bind(this)}>Cancel</Button>
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
                                            {Users}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer clearfix">
                        <ul className="pagination pagination-sm m-0 float-right">
                            <li className="page-item"><a className="page-link" href="/">«</a></li>
                            <li className="page-item"><a className="page-link" href="/">1</a></li>
                            <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">»</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
