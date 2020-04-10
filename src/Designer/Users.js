import React, { Component } from 'react'

export default class Users extends Component {
    render() {
        return (
            <div>
                <h1>USERS WILL APPEAR Here!!!!</h1><br />
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
            </div>
        )
    }
}
