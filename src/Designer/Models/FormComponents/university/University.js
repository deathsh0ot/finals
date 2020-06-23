import React, { Component } from 'react';
import { AvField, AvCheckbox, AvCheckboxGroup   } from 'availity-reactstrap-validation';
import axios from 'axios';
export default class University extends Component {
    state = {
        NewModel: {},
        Context: '',
        ContextDescription:'',
        ModelType:'',
        CheckedModels:'',
        TransModels:[],
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    componentDidMount(){
        axios.get('http://pfe.tn/elementmetaprocess').then((response)=>{
            console.log(response.data);
            this.setState({TransModels:response.data._embedded.elementmetaprocess})
        });
    }
    
    render() {
        let TransModels = Object.values(this.state.TransModels).map((TransModel) => {
            console.log(TransModel);
            return (
             <AvCheckbox key={TransModel.id}
               label={TransModel.id}
               value={TransModel.id}
             />
            )
        });
        console.log(this.state.CheckedModels);
        return (
            <div>
                <div className="form-group">
                    <AvField
                        label="Context"
                        type="text"
                        name="Context"
                        id="Context"
                        className="form-control"
                        onChange={this.handleChange}
                        required
                    />
                    {this.state.Context != '' && (
                        <AvField
                            label="Context Description"
                            type="text"
                            name="ContextDescription"
                            id="ContextDescription"
                            className="form-control"
                            onChange={this.handleChange}
                            required
                        >

                        </AvField>)}
                         {this.state.ContextDescription != '' && (
                        <AvField
                            label="Model Type"
                            type="text"
                            name="ModelType"
                            id="ModelType"
                            className="form-control"
                            onChange={this.handleChange}
                            required
                        >

                        </AvField>)} 
                        
                        {this.state.ContextDescription != '' && (
                        <AvCheckboxGroup
                         name="CheckedModels" 
                         id="CheckedModels"
                         label="From This Model to"
                         onChange={this.handleChange}
                        >
                            {TransModels} 

                        </AvCheckboxGroup>)}
                         {this.state.ContextDescription != '' && (
                        <AvField
                            label="shit Type"
                            type="text"
                            name="shit"
                            id="shit"
                            className="form-control"
                            onChange={this.handleChange}
                            required
                        >
                        </AvField>)} 
                </div>
            </div>
        )
    }
}
