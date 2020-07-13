import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import Unit from './Unit';
import Subject from './Subject';
export default class PForm extends Component {
    state = {
        addedDegree: false,
        NewDegreeModal: false,
        EditDegreeModal: false,
        EditDegree: {
            idDegree: '',
            degreeLabel: '',
        },
        SessionCounter: 1,
        Units: {},
        Subjects: {},
        Degrees: [],
        Models: [],
        ModelTypes: [],
        ModelFields: [],
        ModelMentions: [],
        ModelSpecialties: [],
        formData: {
            select1: '',
            select2: '',
            select3: '',
            select4: '',
            select5: '',
        },
        ModelData: {
            id: '',
            Nb_years: '',
            Calendar_sys: '',
            nb_units: '',
            credit: '',
        },
        Degree: {
            Model_id: '',
            degreeLabel: '',
        },
        sessionNumber: 1,
        Session: [],
        Units: [{ idunit: '', unitLabel: '', unitcredit: '', unitcoeficient: '', unitNature: '', unitRegimen: '', Session_id: '' }],
        Subjects: [{ idsubject: '', subjectLabel: '', subjectcredit: '', subjectcoeficient: '', subjectRegimen: '', unit_id: '' }],
    }
    SessionNumber() {
        if (this.state.ModelData.Calendar_sys === "Semester") {
            let { sessionNumber } = this.state;
            sessionNumber = this.state.ModelData.Nb_years * 2;
            this.setState({ sessionNumber });
        }
        else if (this.state.ModelData.Calendar_sys === "Quarter") {
            let { sessionNumber } = this.state;
            sessionNumber = this.state.ModelData.Nb_years * 4;
            this.setState({ sessionNumber });
        }
        else {
            let { sessionNumber } = this.state;
            sessionNumber = this.state.ModelData.Nb_years * 3;
            this.setState({ sessionNumber });
        }
        return this.state.sessionNumber;
    }

    togglenewDegreeModal() {
        this.setState({
            NewDegreeModal: !this.state.NewDegreeModal,
        });
    }
    toggleeditDegreeModal() {
        this.setState({
            EditDegreeModal: !this.state.EditDegreeModal,
        });
    }
    componentDidMount() {
        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            this.setState({ Models: response.data._embedded.elementmetaprocess })
        });
        this._refreshDegrees();
    }
    editDegree(Degree) {
        let DegreeData = {
            idDegree: Degree.idDegree,
            degreeLabel: Degree.degreeLabel
        }
        let unitData = {
        }
        this.setState({
            EditDegree: DegreeData,
        })
        this.toggleeditDegreeModal();
    }
    //adding units
    handleUnitsChange = (e) => {
        const { name, value } = e.target;
        let Units = [...this.state.Units]
        Units[e.target.dataset.id].id = e.target.dataset.id;
        Units[e.target.dataset.id][name] = value;
        this.setState({ Units });
        console.log(Units);
    }
    addUnit = (e) => {
        this.setState((prevState) => ({
            Units: [...prevState.Units, { idsubject: '', subjectLabel: '', subjectcredit: '', subjectcoeficient: '', subjectRegimen: '', unit_id: '' }],
        }));
    }
    //adding subjects
    handleSubjectsChange = (e) => {
        const { name, value } = e.target;
        let Subjects = [...this.state.Subjects]
        Subjects[e.target.dataset.id].id = e.target.dataset.id;
        Subjects[e.target.dataset.id][name] = value;
        this.setState({ Subjects });
        console.log(Subjects);
    }
    addsubject = (e) => {
        this.setState((prevState) => ({
            Subjects: [...prevState.Subjects, { idunit: "", unitLabel: "", unitcredit: "", unitcoeficient: "", unitNature: "", unitRegimen: "", Session_id: "" }],
        }));
    }
    AddDegree() {
        let { Degree } = this.state;
        Degree.Model_id = this.state.ModelData.id;
        this.setState({ Degree });
        console.log(Degree);
        axios.post('http://pfe.tn/degree', this.state.Degree).then((response) => {
            let { addedDegree } = this.state;
            this.setState({ addedDegree: true });
            console.log("this is it: ", response.data.idDegree);
        });
        // let i;
        // for (i = 1; i < this.state.sessionNumber+1; i++) {
        //     axios.post('http://pfe.tn/session',{
        //         SessionType:this.state.ModelData.Calendar_sys,
        //         SessionNumber:i,
        //         Degree_id:this.state.Degree.id
        //     }).then((response)=>{
        //     
        //})
        //     
        // }
    }
    _refreshDegrees() {

        axios.get('http://pfe.tn/degree').then((response) => {
            //this needs to be fixed (DATA-TABLE)
            const script = document.createElement("script");
            script.src = `dist/js/content.js`;
            script.async = true;
            document.body.appendChild(script);
            //-------------/DATA-TABLE
            this.setState({
                Degrees: response.data._embedded.degree,

            })

        });
    }
    render() {
        let { Units } = this.state;
        let { Subjects } = this.state;
        let Modelz = Object.values(this.state.Models).map((Model) => {
            return (
                <option key={Model.id}>{Model.LabelMetaProcess}</option>

            )
        });
        let ModelTypes = Object.values(this.state.ModelTypes).map((ModelType) => {
            return (
                <option key={ModelType.id}>{ModelType.model_type}</option>
            )
        })
        let ModelFields = Object.values(this.state.ModelFields).map((ModelField) => {
            return (
                <option key={ModelField.id}>{ModelField.Field}</option>
            )
        })
        let ModelMentions = Object.values(this.state.ModelMentions).map((ModelMention) => {
            return (
                <option key={ModelMention.id}>{ModelMention.Mention}</option>
            )
        })
        let ModelSpecialties = Object.values(this.state.ModelSpecialties).map((ModelSpecialty) => {
            return (
                <option key={ModelSpecialty.id}>{ModelSpecialty.Specialty}</option>
            )
        })
        let Degrees = Object.values(this.state.Degrees).map((Degree, index) => {
            index++
            return (
                <tr key={Degree.idDegree}>
                    <td>{index}</td>
                    <td>{Degree.degreeLabel}</td>
                    <td>{Degree.Field}</td>
                    <td>{Degree.Mention}</td>
                    <td>{Degree.Specialty}</td>
                    <td>
                        <button className="btn btn-success mr-2" size="sm" onClick={this.editDegree.bind(this, Degree)}>Edit</button>
                        <button className="btn btn-danger" size="sm" onClick={() => { if (window.confirm('Are you sure you want to delete this degree?')) { } }} >Delete</button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <div>
                    <Button onClick={this.togglenewDegreeModal.bind(this)}>Add a new Degree</Button>
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
                                                axios.get('http://pfe.tn/find-process/LabelMetaProcess.' + this.state.formData.select1)
                                                    .then((response) => {
                                                        this.setState({
                                                            ModelTypes: response.data
                                                        })
                                                    })
                                            }

                                            }
                                        >
                                            <option value=""></option>
                                            {Modelz}
                                        </AvField >
                                        {this.state.formData.select1 !== '' && (
                                            <AvField
                                                type="select"
                                                name="select2"
                                                label="select model type"
                                                onChange={(e) => {
                                                    let { formData } = this.state;
                                                    formData.select2 = e.target.value;
                                                    this.setState({ formData });
                                                    axios.post('http://pfe.tn/find-process', {
                                                        LabelMetaProcess: this.state.formData.select1,
                                                        model_type: this.state.formData.select2,
                                                    })
                                                        .then((response) => {
                                                            this.setState({
                                                                ModelFields: response.data
                                                            })
                                                        })
                                                }
                                                }
                                            >
                                                {ModelTypes}
                                            </AvField>
                                        )}
                                        {this.state.formData.select2 !== '' && (
                                            <AvField
                                                type="select"
                                                name="select3"
                                                label="select the field"
                                                onChange={(e) => {
                                                    let { formData } = this.state;
                                                    formData.select3 = e.target.value;
                                                    this.setState({ formData });
                                                    axios.post('http://pfe.tn/find-process', {
                                                        LabelMetaProcess: this.state.formData.select1,
                                                        model_type: this.state.formData.select2,
                                                        Field: this.state.formData.select3,
                                                    })
                                                        .then((response) => {
                                                            this.setState({
                                                                ModelMentions: response.data
                                                            })
                                                        })
                                                }
                                                }
                                            >
                                                {ModelFields}
                                            </AvField>
                                        )}
                                        {this.state.formData.select3 !== '' && (
                                            <AvField
                                                type="select"
                                                name="select4"
                                                label="select the mention"
                                                onChange={(e) => {
                                                    let { formData } = this.state;
                                                    formData.select4 = e.target.value;
                                                    this.setState({ formData });
                                                    axios.post('http://pfe.tn/find-process', {
                                                        LabelMetaProcess: this.state.formData.select1,
                                                        model_type: this.state.formData.select2,
                                                        Field: this.state.formData.select3,
                                                        Mention: this.state.formData.select4
                                                    })
                                                        .then((response) => {
                                                            this.setState({
                                                                ModelSpecialties: response.data
                                                            })
                                                        })
                                                }
                                                }
                                            >
                                                {ModelMentions}
                                            </AvField>
                                        )}
                                        {this.state.formData.select4 !== '' && (
                                            <AvField
                                                type="select"
                                                name="select5"
                                                label="select the specialty"
                                                onChange={(e) => {
                                                    let { formData } = this.state;
                                                    formData.select5 = e.target.value;
                                                    this.setState({ formData });
                                                    axios.post('http://pfe.tn/find-process', {
                                                        LabelMetaProcess: this.state.formData.select1,
                                                        model_type: this.state.formData.select2,
                                                        Field: this.state.formData.select3,
                                                        Mention: this.state.formData.select4,
                                                        Specialty: this.state.formData.select5
                                                    })
                                                        .then((response) => {
                                                            this.setState({
                                                                ModelData: response.data[0]
                                                            })
                                                            console.log(this.state.formData.select5)
                                                            console.log("this is da model:", this.state.ModelData)
                                                            this.SessionNumber();
                                                        })
                                                }
                                                }
                                            >
                                                {ModelSpecialties}
                                            </AvField>
                                        )}
                                        {this.state.formData.select5 !== '' && (
                                            <AvField
                                                name="DegreeLabel"
                                                type="text"
                                                label="Degree label"
                                                placeholder="enter degree name"
                                                value={this.state.EditDegree.degreeLabel}
                                                onChange={(e) => {
                                                    let { Degree } = this.state;
                                                    Degree.degreeLabel = e.target.value;
                                                    this.setState({ Degree });
                                                }}

                                            />
                                        )}
                                        {this.state.Degree.degreeLabel !== '' && (
                                            <Button onClick={this.AddDegree.bind(this)}>save degree and continue</Button>
                                        )}
                                        {this.state.addedDegree && (
                                            <div>
                                                <br />
                                                <div className="card card-danger">
                                                    <div className="card-header">{this.state.ModelData.Calendar_sys + " number :" + this.state.SessionCounter}</div>
                                                    <div className="card-body">
                                                        <AvForm>
                                                            <div>
                                                                <form onChange={this.handleUnitsChange.bind(this)}>
                                                                    <Unit Units={Units} />
                                                                    <form onChange={this.handleSubjectsChange.bind(this)}>
                                                                        <Subject Subjects={Subjects} />
                                                                        <Button onClick={this.addsubject.bind(this)}>Add subject</Button>
                                                                    </form>
                                                                    <br />
                                                                    <Button onClick={this.addUnit.bind(this)}>Add unit</Button>
                                                                </form>
                                                            </div>
                                                            <br />
                                                            <Button>{"Next " + this.state.ModelData.Calendar_sys}</Button>
                                                        </AvForm>
                                                    </div>
                                                </div>
                                            </div>
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

                    <Modal isOpen={this.state.EditDegreeModal} toggle={this.toggleeditDegreeModal.bind(this)} >

                        <ModalHeader toggle={this.toggleeditDegreeModal.bind(this)}>Edit degree</ModalHeader>
                        <ModalBody>
                            <div className="card card-danger">
                                <div className="card-header">Edit degree Form</div>
                                <div className="card-body">
                                    <AvForm >
                                        <AvField
                                            name="DegreeLabel"
                                            type="text"
                                            label="Degree label"
                                            placeholder="enter degree name"
                                            value={this.state.EditDegree.degreeLabel}

                                            onChange={(e) => {
                                                console.log("something:", this.state.EditDegree);
                                                let { EditDegree } = this.state;
                                                EditDegree.degreeLabel = e.target.value;
                                                this.setState({ EditDegree });
                                            }}
                                        />

                                    </AvForm>
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" >Edit Degree</Button>{' '}
                            <Button color="secondary" onClick={this.toggleeditDegreeModal.bind(this)}>Cancel</Button>
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
                                                    <th>Degree Field</th>
                                                    <th>Degree Mention</th>
                                                    <th>Degree Specialty</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Degrees}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>#</td>
                                                    <th>Degree name</th>
                                                    <th>Degree Field</th>
                                                    <th>Degree Mention</th>
                                                    <th>Degree Specialty</th>
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
