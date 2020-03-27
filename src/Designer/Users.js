import React, { Component } from 'react'

export default class Users extends Component {
    render() {
        return (
            <div>
                <h1>USERS WILL APPEAR Here!!!!</h1><br />
                <div class="card card-danger">
                    <div class="card-header">USER FORM</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label htmlFor="userName">User name</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                class="form-control"
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="NIC">NIC</label>
                            <input
                                type="text"
                                name="NIC"
                                id="NIC"
                                class="form-control"
                            />
                        </div>
                        <div>
                        <input type="submit" value="Submit" class="btn btn-danger" />
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
