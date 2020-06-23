import React, { Component } from 'react';
import WorkModel from './Models/WorkModel'
import { AvForm } from 'availity-reactstrap-validation';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
export default class Models extends Component {
    state = {
        newModelModal: false,
        models: [],
    }

    togglenewModelModal() {
        this.setState({ newModelModal: !this.state.newModelModal });
    }
    componentDidMount(){
        this._refreshModels();
    }
    _refreshModels() {

        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            //this needs to be fixed (DATA-TABLE)
            const script = document.createElement("script");
            script.src = `dist/js/content.js`;
            script.async = true;
            document.body.appendChild(script);
            //-------------/DATA-TABLE
            console.log(response.data)
            this.setState({
                models:response.data._embedded.elementmetaprocess,

            })

        });
    }

    render() {
        let models = Object.values(this.state.models).map((model,index) => {
            console.log(model);
            index++;
            return (
                <tr key={model.id}>
                    <td>{index}</td>
                    <td>{model.LabelMetaProcess}</td>
                    <td>{model.MetaContext_id}</td>
                    <td>{model.MetaModelsWorker_id}</td>
                    <td>something else</td>
                    <td>{model.id}</td>
                    <td>
                        <button className="btn btn-success mr-2" size="sm" >Edit</button>
                        <button className="btn btn-danger" size="sm">Delete</button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <div><Button onClick={this.togglenewModelModal.bind(this)}>Add a new Model</Button>
                    <Modal isOpen={this.state.newModelModal} toggle={this.togglenewModelModal.bind(this)} >

                        <ModalHeader toggle={this.togglenewModelModal.bind(this)}>Add new Model</ModalHeader>
                        <ModalBody>
                            <div className="card card-danger">
                                <div className="card-header">Model Form</div>
                                <div className="card-body">
                                    <AvForm >

                                        <WorkModel />
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
                            <Button color="primary" >Add Model</Button>{' '}
                            <Button color="secondary" onClick={this.togglenewModelModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header"><h3 className="card-title">Models</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Model name</th>
                                                <th>Model Type</th>
                                                <th>?</th>
                                                <th>???</th>
                                                <th>???</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {models}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>#</td>
                                                <td>Model name</td>
                                                <td>Model Type</td>
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
        )
    }
}