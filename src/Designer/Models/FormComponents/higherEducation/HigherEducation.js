import React, { Component } from 'react';
import { AvField, AvCheckbox, AvCheckboxGroup } from 'availity-reactstrap-validation';
import axios from 'axios';
import { Button } from 'reactstrap';
import ExtraRules from './ExtraRules';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
export default class HigherEducation extends Component {
    state = {
        NewModelData: {
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
            Calendar_sys: 'Quarter',
            nb_units: '',
            credit: '',
        },
        NewContextData: {
            id: '',
            labelMetaContext: '',
            DescMetaContext: '',
        },

        NewTransRulesData: {
            Pass_id: '',
            PassRulsDesc: 'shit',
            ElementMetaProcess_id: '',
            evenPassRuls: 'shit',
            PassRuls: '',
            LabelPassRuls: '',
            PassRulsOrder: '12'
        },
        CheckedModels: '',
        TransModels: [],
        CheckedModelNames: [],
        Sessions: '',
        ShowTransForm: false,
        Rules: [{ id: '', Rule: '' }],
        Modelnumber: '',
        Contextnumber: '',
        Transnumber: '',
        linkednumber: '',
        linkedModel: {
            l_id: '',
            MetaProcess: '',
            Linked: ''
        }

    }
    ShowTransForm() {
        this.setState({ ShowTransForm: true });
    }

    // /* handling adding rules changes
    handleRulesChange = (e) => {
        let Rules = [...this.state.Rules]
        Rules[e.target.dataset.id].Rule = e.target.value;
        Rules[e.target.dataset.id].id = e.target.dataset.id;
        this.setState({ Rules });
        console.log(Rules);
    }
    addRule = (e) => {
        this.setState((prevState) => ({
            Rules: [...prevState.Rules, { id: "", Rule: "" }],
        }));
    }
    //adding rules */
    fillRules() {
        let { NewTransRulesData } = this.state;
        NewTransRulesData.PassRuls = this.state.Rules;
        this.setState({ NewTransRulesData });

    }
    lastElement() {
        axios.get('http://pfe.tn/last-element').then((response) => {
            this.setState({
                Modelnumber: response.data._embedded.last_element[2].Elementmetaprocess,
                Contextnumber: response.data._embedded.last_element[0].Metacontext,
                Transnumber: response.data._embedded.last_element[1].Elementmetapassruls,
                linkednumber: response.data._embedded.last_element[3].linkedprocess,
            })
            let { NewModelData } = this.state;
            let { NewContextData } = this.state;
            let { NewTransRulesData } = this.state;
            let { linkedModel } = this.state;
            NewModelData.id = this.state.Modelnumber + 1;
            NewContextData.id = this.state.Contextnumber + 1;
            NewTransRulesData.Pass_id = this.state.Transnumber + 1;
            linkedModel.l_id = this.state.linkednumber + 1;
            NewModelData.MetaContext_id = this.state.Contextnumber + 1;
            this.setState({
                NewModelData,
                NewContextData,
                NewTransRulesData,
                linkedModel
            });
            console.log(
                'Model number', this.state.NewModelData.id,
                "Context number", this.state.NewContextData.id,
                'Transrules number', this.state.NewTransRulesData.Pass_id,
                'linked number', this.state.linkedModel.l_id,
            );
        });
    }
    addLinked() {
        if (this.state.ShowTransForm === true) {
            let { linkedModel } = this.state;
            linkedModel.MetaProcess = this.state.NewModelData.id;
            linkedModel.Linked = JSON.stringify(this.state.CheckedModelNames);
            this.setState({ linkedModel });
            console.log(this.state.linkedModel);
            axios.post('http://pfe.tn/linkedprocess', this.state.linkedModel)
                .then((response) => {
                    this.setState({
                        linkedModel: {
                            l_id: '',
                            MetaProcess: '',
                            Linked: ''
                        }
                    })
                    console.log(response);
                }).catch(error => { console.log(error) })
        }
    }
    addTransRules() {
        if (this.state.ShowTransForm === true) {
            let { NewTransRulesData } = this.state;
            NewTransRulesData.LabelPassRuls = `Trasition from ${this.state.NewModelData.LabelMetaProcess} to ${this.state.CheckedModelNames[0]}`;
            NewTransRulesData.ElementMetaProcess_id = this.state.NewModelData.id;
            NewTransRulesData.PassRuls = JSON.stringify(this.state.Rules);
            this.setState({ NewTransRulesData });
            console.log(this.state.NewTransRulesData);
            axios.post('http://pfe.tn/elementmetapassruls', this.state.NewTransRulesData)
                .then((response) => {
                    this.setState({
                        NewTransRulesData: {
                            Pass_id: '',
                            PassRulsDesc: 'shit',
                            ElementMetaProcess_id: '',
                            evenPassRuls: 'shit',
                            PassRuls: '',
                            LabelPassRuls: '',
                            PassRulsOrder: '12'
                        },
                    })
                    console.log(response);
                }).catch(error => { console.log('this is it', error) })
        }
    }

    componentDidMount() {
        axios.get('http://pfe.tn/elementmetaprocess').then((response) => {
            //console.log(response.data);
            this.setState({ TransModels: response.data._embedded.elementmetaprocess })
        });
        this.lastElement();
    }
    componentWillUnmount() {
        //need to fix that memory leak here bruh
    }
    addModel() {
        axios.post('http://pfe.tn/metacontext', this.state.NewContextData).then((response) => {

            console.log(response.data);
            this.setState({
                NewContextData: {
                    id: '',
                    labelMetaContext: '',
                    DescMetaContext: '',
                },
            })
        });
        console.log(this.state.NewModelData);
        axios.post('http://pfe.tn/elementmetaprocess', this.state.NewModelData).then((response) => {
            this.addLinked();
            this.addTransRules();
            this.setState({
                NewModelData: {
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
                    Calendar_sys: 'Quarter',
                    nb_units: '',
                    credit: '',
                },
            })
            alert('Model Added successfully !!');
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
                    label={TransModel.LabelMetaProcess +" : "+TransModel.model_type+" : "+TransModel.Specialty}
                    value={TransModel.LabelMetaProcess}
                    onClick={e => this.checkvalue(e)}
                />
            )
        });
        let TransModelsForms = this.state.CheckedModelNames.map((TransModelForm, index) => {
            return (
                <div key={index}>
                    <h6>Transition from this model to {TransModelForm}</h6>
                    <AvField name={TransModelForm} label="Average Score" />
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
        // console.log(this.state.CheckedModels);
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
                                this.state.NewContextData.labelMetaContext = e.target.value;
                            }}
                            required
                        />

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

                        </AvField>

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

                        </AvField>

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

                        </AvField>

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

                        </AvField>

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
                        </AvField>

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

                        <AvCheckboxGroup
                            name="CheckedModels"
                            id="CheckedModels"
                            label="Trasition from This Model to"

                        >
                            {TransModels}
                        </AvCheckboxGroup>
                        {this.state.ContextDescription !== '' && (<Button onClick={this.ShowTransForm.bind(this)}>Add transition rules</Button>)}
                        {this.state.ShowTransForm === true && TransModelsForms}
                    </div>
                    <Button color="primary" onClick={this.addModel.bind(this)}>Add Model</Button>
                </AvForm>
            </div>

        )
    }
}
