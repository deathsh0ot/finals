import React, { Component } from 'react';
import { AvField, AvCheckbox, AvCheckboxGroup } from 'availity-reactstrap-validation';
import axios from 'axios';
import { Button } from 'reactstrap';
import ExtraRules from './ExtraRules';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
export default class HigherEducation extends Component {
    state = {
        NewModelData: {
            id:'',
            MetaModelsWorker_id:'1',
            MetaContext_id:'',
            LabelMetaProcess:'',
            DescMetaProcess:'',
            model_type: '',
            Field: '',
            Mention: '',
            Specialty: '',
            Nb_years: '',
            Calendar_sys: '',
            nb_units: '',
            credit: '',
        },
        NewContextData:{
            id:'',
            labelMetaContext:'',
            DescMetaContext:'',
        },

        NewTransRulesData: {
        },
        CheckedModels: '',
        TransModels: [],
        CheckedModelNames: [],
        Sessions: '',
        ShowTransForm: false,
        Rules: [{ Rule: "" }],
        Modelnumber:'',
        Contextnumber:'',

    }
    ShowTransForm() {
        this.setState({ ShowTransForm: true });
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.value);
    };
    // /* handling adding rules changes
    handleRulesChange = (e) => {
        if (["ExtraRule"].includes(e.target.className)) {
            let Rules = [...this.state.Rules]
            Rules[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({ Rules }, () => console.log(this.state.Rules))
        } else {
            this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
    }
    addRule = (e) => {
        this.setState((prevState) => ({
            Rules: [...prevState.Rules, { Rule: "" }],
        }));
    }
    //adding rules */
    componentDidMount() {
        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            //console.log(response.data);
            this.setState({ TransModels: response.data._embedded.elementmetaprocess })
        });
        axios.get('http://pfe.tn/last-element').then((response) =>{
            this.setState({
                Modelnumber: response.data._embedded.last_element[2].Elementmetaprocess,
                Contextnumber:response.data._embedded.last_element[0].Metacontext,

            })
            this.state.NewModelData.id=this.state.Modelnumber+1;
            console.log('Model number',this.state.NewModelData.id);
            this.state.NewContextData.id=this.state.Contextnumber+1;
            this.state.NewModelData.MetaContext_id=this.state.Contextnumber+1;
            console.log("Context number",this.state.NewModelData.MetaContext_id);
        });
    }
    componentWillUnmount() {
        //need to fix that memory leak herex bruh
    }
    addModel(){
        axios.post('http://pfe.tn/metacontext',this.state.NewContextData).then((response) => {
            
        console.log(response.data);
            this.setState({
                NewContextData:{
                    id:'',
                    labelMetaContext:'',
                    DescMetaContext:'',
                },
            })
        });
        console.log(this.state.NewModelData);
        axios.post('http://pfe.tn/elementmetaprocess',this.state.NewModelData).then((response) => {
            this.setState({
                NewModelData: {
                    id:'',
                    MetaModelsWorker_id:'1',
                    MetaContext_id:'',
                    LabelMetaProcess:'',
                    DescMetaProcess:'',
                    model_type: '',
                    Field: '',
                    Mention: '',
                    Specialty: '',
                    Nb_years: '',
                    Calendar_sys: '',
                    nb_units: '',
                    credit: '',
                },
            })
        })
    }
    checkvalue(e) {

        if (e.target.checked === false) {
            this.state.ShowTransRules = false;
            //deletes element from the table if it exists
            const index = this.state.CheckedModelNames.indexOf(e.target.value);
            if (index > -1) {
                this.state.CheckedModelNames.splice(index, 1);
            }

            console.log(this.state.CheckedModelNames);
        }
        else {
            this.state.ShowTransRules = true;
            console.log('checkbox checked:', (e.target.value));
            this.state.CheckedModelNames.push(e.target.value);
            console.log(this.state.CheckedModelNames);
        }

    }

    render() {
        let { Rules } = this.state;
        let TransModels = Object.values(this.state.TransModels).map((TransModel) => {
            // console.log(TransModel);
            return (
                <AvCheckbox key={TransModel.id}
                    name="Checkbox"
                    label={TransModel.LabelMetaProcess}
                    value={TransModel.LabelMetaProcess}
                    onClick={e => this.checkvalue(e)}
                />
            )
        });
        let TransModelsForms = this.state.CheckedModelNames.map((TransModelForm, index) => {
            return (
                <div key={index}>
                    <h6>Transition from this model to {TransModelForm}</h6>
                    <AvField name={TransModelForm} label="Score" />
                    <AvField name="Credit" label="Credit" />
                    <div>
                        <form onChange={this.handleRulesChange.bind(this)}>
                            <ExtraRules Rules={Rules} />
                            <Button onClick={this.addRule.bind(this)}>Add an extra rule</Button>
                        </form>
                    </div>
                </div>
            )
        });
        console.log(this.state.CheckedModels);
        return (

            <div>
                <AvForm>
                    <div className="form-group">
                    <AvField
                            label="Model Name"
                            type="text"
                            name="LabelMetaProcess"
                            id="LabelMetaProcess"
                            className="form-control"
                            value={this.state.NewModelData.LabelMetaProcess}
                            onChange={(e) => {
                                let { NewModelData } = this.state;
                                NewModelData.LabelMetaProcess = e.target.value;
                                this.setState({ NewModelData });
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
                            value={this.state.NewModelData.DescMetaProcess}
                            onChange={(e) => {
                                let { NewModelData } = this.state;
                                NewModelData.DescMetaProcess = e.target.value;
                                this.setState({ NewModelData });
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
                            value={this.state.NewModelData.model_type}
                            onChange={(e) => {
                                let { NewModelData } = this.state;
                                NewModelData.model_type = e.target.value;
                                this.setState({ NewModelData });
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
                            value={this.state.NewModelData.Field}
                            onChange={(e) => {
                                let { NewModelData } = this.state;
                                NewModelData.Field = e.target.value;
                                this.setState({ NewModelData });
                                this.state.NewContextData.labelMetaContext=e.target.value;
                            }}
                            required
                        />
                        {this.state.Context !== '' && (
                            <AvField
                                label="Context Description"
                                type="text"
                                name="ContextDescription"
                                id="ContextDescription"
                                className="form-control"
                                onChange={(e) => {
                                    let { NewContextData } = this.state;
                                    NewContextData.DescMetaContext = e.target.value;
                                    this.setState({ NewContextData });
                                }}
                                required
                            >

                            </AvField>)}
                        {this.state.Context !== '' && (
                            <AvField
                                label="Mention"
                                type="text"
                                name="Mention"
                                id="Mention"
                                className="form-control"
                                value={this.state.NewModelData.Mention}
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.Mention = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            >

                            </AvField>)}
                        {this.state.Context !== '' && (
                            <AvField
                                label="Specialty"
                                type="text"
                                name="Specialty"
                                id="Specialty"
                                className="form-control"
                                value={this.state.Specialty}
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.Specialty = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            >

                            </AvField>)}


                        {this.state.ContextDescription !== '' && (
                            <AvField
                                label="Number of study years/Levels"
                                type="text"
                                name="Nb_years"
                                id="Nb_years"
                                className="form-control"
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.Nb_years = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            >

                            </AvField>)}
                        {this.state.ContextDescription !== '' && (
                            <AvField
                                label="Type of academic calendar system "
                                type="select"
                                name="Calendar_sys"
                                id="Calendar_sys"
                                className="form-control"
                                value={this.state.NewModelData.Calendar_sys}
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.Calendar_sys = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            >
                                <option>Quarter</option>
                                <option>Semester</option>
                                <option>Trimester</option>
                            </AvField>)}
                        {this.state.ContextDescription !== '' && (
                            <AvField
                                label="Total Number of units"
                                type="text"
                                name="nb_units"
                                id="nb_units"
                                className="form-control"
                                value={this.state.NewModelData.nb_units}
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.nb_units = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            />
                        )}
                        {this.state.ContextDescription !== '' && (
                            <AvField
                                label="Total Credit"
                                type="text"
                                name="credit"
                                id="credit"
                                className="form-control"
                                value={this.state.NewModelData.credit}
                                onChange={(e) => {
                                    let { NewModelData } = this.state;
                                    NewModelData.credit = e.target.value;
                                    this.setState({ NewModelData });
                                }}
                                required
                            />
                        )}
                        {this.state.ContextDescription !== '' && (
                            <AvCheckboxGroup
                                name="CheckedModels"
                                id="CheckedModels"
                                label="Trasition from This Model to"

                            >
                                {TransModels}
                            </AvCheckboxGroup>

                        )}
                        {this.state.ContextDescription !== '' && (<Button onClick={this.ShowTransForm.bind(this)}>Add transition rules</Button>)}
                        {this.state.ShowTransForm === true && TransModelsForms}
                    </div>
                    <Button color="primary" onClick={this.addModel.bind(this)}>Add Model</Button>
                </AvForm>
            </div>

        )
    }
}
