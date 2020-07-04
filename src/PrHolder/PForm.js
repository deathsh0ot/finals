import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
export default class PForm extends Component {
    state = {
        NewDegreeModal: false,
        Models: [],
        ModelTypes:[],
        formData: {
            select1: '',
            select2:'',
        }
    }
    togglenewDegreeModal() {
        this.setState({
            NewDegreeModal: !this.state.NewDegreeModal,
        });
    }
    componentDidMount() {
        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            //console.log(response.data);
            this.setState({ Models: response.data._embedded.elementmetaprocess })
        });
    }
    render() {
        let Modelz = Object.values(this.state.Models).map((Model) => {
            return (
                <option key={Model.id}>{Model.LabelMetaProcess}</option>

            )
        });
        let ModelTypes =Object.values(this.state.ModelTypes).map((ModelType) =>{
            return(
                <option key={ModelType.id}>{ModelType.model_type}</option>
            )
        })
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
                                        <AvField
                                            type="select"
                                            name="select1"
                                            label="select model name"
                                            value={this.state.formData.select1}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.select1 = e.target.value;
                                                this.setState({ formData });
                                                axios.get('http://pfe.tn/find-process/LabelMetaProcess.'+this.state.formData.select1)
                                                .then((response) =>{
                                                    this.setState({
                                                        ModelTypes: response.data
                                                    })
                                                })
                                            }

                                            }
                                        >
                                            {Modelz}
                                        </AvField >
                                        {this.state.formData.select1 !==''&&(
                                            <AvField
                                            type="select"
                                            name="select2"
                                            label="select model type"
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.select2 = e.target.value;
                                                this.setState({ formData });
                                                console.log(this.state.formData.select2);
                                            }
                                            }
                                            >
                                                {ModelTypes}
                                            </AvField>
                                        )}
                                        {this.state.formData.select2 !=='' &&(
                                            <AvField
                                            type="select"
                                            name="select3"
                                            label="select the">

                                            </AvField>
                                        )}
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
