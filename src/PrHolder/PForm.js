import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
export default class PForm extends Component {
    state={
        NewDegreeModal:false,

    }
    togglenewDegreeModal() {
      this.setState({
          NewDegreeModal: !this.state.NewDegreeModal,
      });
  }
    render() {
        return (
            <div>
                <div><Button onClick={this.togglenewDegreeModal.bind(this)}>Add a new Degree</Button>
                <Modal isOpen={this.state.NewDegreeModal} toggle={this.togglenewDegreeModal.bind(this)} >

                    <ModalHeader toggle={this.togglenewDegreeModal.bind(this)}>Add new Degree</ModalHeader>
                    <ModalBody>
                        <div className="card card-danger">
                            <div className="card-header">Degree Form</div>
                            <div className="card-body">
                                <AvForm >

                                    Ayooooo


                                    {/* <div>
                                        <Alert color="danger" isOpen={} toggle={}>Write something here</Alert>
                                    </div>
                                    <div>
                                        <Alert color="danger" isOpen={} toggle={}>Please fill out all input fields</Alert>
                                    </div> */}
                                </AvForm>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Add Degree</Button>{' '}
                        <Button color="secondary" onClick={this.togglenewDegreeModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
                 <div>
            <section className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header"><h3 className="card-title">Degrees</h3>
                            </div>
                            <div className="card-body">




                                <table id="example2" className="table table-bordered table-hover" >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Degree name</th>
                                            <th>Degree Type</th>
                                            <th>?</th>
                                            <th>???</th>
                                            <th>???</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>Degrees will appear here </td> {/*Degrees object goes here */}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>#</td>
                                            <td>Degree name</td>
                                            <td>Degree Type</td>
                                            <td>???</td>
                                            <td>??</td>
                                            <td>???</td>
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
            </div>
        )
    }
}
