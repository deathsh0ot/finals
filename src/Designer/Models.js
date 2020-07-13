import React, { Component } from 'react';
import WorkModel from './Models/WorkModel'
import ExtraRules from './Models/FormComponents/higherEducation/ExtraRules';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class Models extends Component {
    state = {
        newModelModal: false,
        EditedModelModal: false,
        models: [],
        EditedModelData: {
            id: '',
            MetaModelsWorker_id: '1',
            MetaContext_id: '',
            LabelMetaProcess: '',
            DescMetaProcess: '',
            model_type: '',
            Field: '',
            Mention: '',
            Specialty: '',
            Nb_years: '',
            Calendar_sys: '',
            nb_units: '',
            credit: '',
        },
        editedMetacontext:{
            id: '',
            labelMetaContext:'',
            DescMetaContext:'',
        }

    }

    togglenewModelModal() {
        this.setState({ newModelModal: !this.state.newModelModal });
    }
    toggleEditedModelModal() {
        this.setState({ EditedModelModal: !this.state.EditedModelModal });
    }
    componentDidMount() {
        this._refreshModels();
    }
    _refreshModels() {

        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            //this needs to be fixed (DATA-TABLE)
            const script = document.createElement("script");
            script.src = `dist/js/content.js`;
            script.async = true;
            document.body.appendChild(script);
            this.setState({
                models: response.data._embedded.elementmetaprocess,
            })
        });
    }
   
    deleteModel(id) {
        axios.delete('http://pfe.tn/elementmetaprocess/' + id).then((response) => {
            console.log(response);
            this._refreshModels();
        });
    }
    updateModel(){
        axios.put('http://pfe.tn/metacontext/' + this.state.editedMetacontext.id,this.state.editedMetacontext)
        .then((response) => {
            this.setState({
                editedMetacontext:{
                    id: '',
                    labelMetaContext:'',
                    DescMetaContext:'',
                }
            });
        })
        axios.put('http://pfe.tn/elementmetaprocess/' + this.state.EditedModelData.id, this.state.EditedModelData)
        .then((response) => {
            this.setState({
                EditedModelModal: false,
                EditedModelData: {
                    id: '',
                    MetaModelsWorker_id: '1',
                    MetaContext_id: '',
                    LabelMetaProcess: '',
                    DescMetaProcess: '',
                    model_type: '',
                    Field: '',
                    Mention: '',
                    Specialty: '',
                    Nb_years: '',
                    Calendar_sys: '',
                    nb_units: '',
                    credit: '',
                },
            });
            this._refreshModels();
        })
    }
    editModel(model) {
        let ModelData={
            id:model.id,
            MetaModelsWorker_id: model.MetaModelsWorker_id,
            MetaContext_id: model.MetaContext_id,
            LabelMetaProcess: model.LabelMetaProcess,
            DescMetaProcess: model.DescMetaProcess,
            model_type: model.model_type,
            Field: model.Field,
            Mention: model.Mention,
            Specialty: model.Specialty,
            Nb_years: model.Nb_years,
            Calendar_sys: model.Calendar_sys,
            nb_units: model.nb_units,
            credit: model.credit,
        }
        let ContextData={
            id: model.MetaContext[0].id,
            labelMetaContext:model.MetaContext[0].labelMetaContext,
            DescMetaContext:model.MetaContext[0].DescMetaContext,
        }
        this.setState({
            EditedModelData: ModelData,
            editedMetacontext: ContextData,
        });
        console.log(this.state.editedMetacontext);
        console.log(this.state.EditedModelData);
        this.toggleEditedModelModal();
    }
    done(){
        this.togglenewModelModal();
        this._refreshModels();
    }

    render() {
        let models = Object.values(this.state.models).map((model, index) => {
            index++;
            //console.log(model);
            return (
                <tr key={model.id}>
                    <td>{index}</td>
                    <td>{model.LabelMetaProcess}</td>
                    <td>{model.model_type}</td>
                    <td>{model.Field}</td>
                    <td>{model.Mention}</td>
                    <td>{model.Specialty}</td>
                    <td>
                        <button className="btn btn-success mr-2" size="sm" onClick={this.editModel.bind(this,model)} >Edit</button>
                        <button className="btn btn-danger" size="sm"  onClick={() => { if (window.confirm('Are you sure you want to delete this model?')){let deleteModel = this.deleteModel.bind(this, model.id); deleteModel(); }}}>Delete</button>
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
                                    </AvForm>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.done.bind(this)}>Done</Button>{' '}
                            <Button color="secondary" onClick={this.togglenewModelModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.EditedModelModal} toggle={this.toggleEditedModelModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditedModelModal.bind(this)}>Edit Model</ModalHeader>
                        <ModalBody>
                            <div className="card card-primary">
                                <div className="card-header">Edit model form</div>
                                <div className="card-body">
                                    <AvForm>
                                        <div className="form-group">
                                            <AvField
                                                label="Model Name"
                                                type="text"
                                                name="LabelMetaProcess"
                                                id="LabelMetaProcess"
                                                className="form-control"
                                                value={this.state.EditedModelData.LabelMetaProcess}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.LabelMetaProcess = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a Model name' },

                                                }}
                                            />
                                            <AvField
                                                label="Model description"
                                                type="text"
                                                name="DescMetaProcess"
                                                id="DescMetaProcess"
                                                className="form-control"
                                                value={this.state.EditedModelData.DescMetaProcess}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.DescMetaProcess = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a brief description of the model' },

                                                }}
                                            />
                                            <AvField
                                                label="Model Type"
                                                type="text"
                                                name="model_type"
                                                id="model_type"
                                                className="form-control"
                                                value={this.state.EditedModelData.model_type}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.model_type = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                validate={{
                                                    required: { value: true, errorMessage: 'Please enter a Model type' },

                                                }}
                                            />
                                            <AvField
                                                label="Context/Domain (Ex: Science and technology, Economic Science ...)"
                                                type="text"
                                                name="Field"
                                                id="Field"
                                                className="form-control"
                                                value={this.state.EditedModelData.Field}
                                                onChange={(e) => {
                                                    let { EditedModelData,editedMetacontext } = this.state;
                                                    EditedModelData.Field = e.target.value;
                                                    editedMetacontext.labelMetaContext=e.target.value;
                                                    this.setState({ 
                                                        EditedModelData, 
                                                        editedMetacontext
                                                    });
                                                }}
                                                required
                                            />

                                            <AvField
                                                label="Context Description"
                                                type="text"
                                                name="ContextDescription"
                                                id="ContextDescription"
                                                className="form-control"
                                                value={this.state.editedMetacontext.DescMetaContext}
                                                onChange={(e) => {
                                                    let { editedMetacontext } = this.state;
                                                    editedMetacontext.DescMetaContext = e.target.value;
                                                    this.setState({ editedMetacontext });
                                                }}
                                                required
                                            >

                                            </AvField>

                                            <AvField
                                                label="Mention"
                                                type="text"
                                                name="Mention"
                                                id="Mention"
                                                className="form-control"
                                                value={this.state.EditedModelData.Mention}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.Mention = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            >

                                            </AvField>

                                            <AvField
                                                label="Specialty"
                                                type="text"
                                                name="Specialty"
                                                id="Specialty"
                                                className="form-control"
                                                value={this.state.EditedModelData.Specialty}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.Specialty = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            >

                                            </AvField>


                                            <AvField
                                                label="Number of study years/Levels"
                                                type="text"
                                                name="Nb_years"
                                                id="Nb_years"
                                                className="form-control"
                                                value={this.state.EditedModelData.Nb_years}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.Nb_years = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            >

                                            </AvField>

                                            <AvField
                                                label="Type of academic calendar system "
                                                type="select"
                                                name="Calendar_sys"
                                                id="Calendar_sys"
                                                className="form-control"
                                                value={this.state.EditedModelData.Calendar_sys}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.Calendar_sys = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            >
                                                <option>Quarter</option>
                                                <option>Semester</option>
                                                <option>Trimester</option>
                                            </AvField>

                                            <AvField
                                                label="Number of units"
                                                type="text"
                                                name="nb_units"
                                                id="nb_units"
                                                className="form-control"
                                                value={this.state.EditedModelData.nb_units}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.nb_units = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            />


                                            <AvField
                                                label="Total Credit"
                                                type="text"
                                                name="credit"
                                                id="credit"
                                                className="form-control"
                                                value={this.state.EditedModelData.credit}
                                                onChange={(e) => {
                                                    let { EditedModelData } = this.state;
                                                    EditedModelData.credit = e.target.value;
                                                    this.setState({ EditedModelData });
                                                }}
                                                required
                                            />

                                        </div>
                                    </AvForm>

                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateModel.bind(this)}>Update Model</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditedModelModal.bind(this)}>Cancel</Button>
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
                                                <th>Model type</th>
                                                <th>Context/Domain</th>
                                                <th>Mention</th>
                                                <th>Specialty</th>
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
                                                <td>Context/Domain</td>
                                                <td>Mention</td>
                                                <td>Specialty</td>
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