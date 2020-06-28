import React, { Component, Fragment } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import AngryJoe from './AngryJoe';
import * as Models from './FormComponents'
export default class WorkModel extends Component {
    state={
        selectedModelType:'',
       
    };
    render() {
        return (
            <Fragment>
                <section>
                    {/* Select a Work Model Here */}
                    {this.renderWorkModelSelector()}

                    {/* Dynamic component rendered here ! */}
                    {this.renderSelectedModel(this.state.selectedModelType)}
                </section>
            </Fragment>
        )
    }
    renderWorkModelSelector(){
        return(
            <div className="form-group">
                <AvField type="select"
                 label="Select work model for :" 
                 name="select"
                 onChange={(e) => this.setState({ selectedModelType: e.target.value })}
                 >
                    <option></option>
                    <option>Higher_Education</option>
                    <option>WorkModelB</option>
                </AvField>

            </div>
        )
    }
    renderSelectedModel(selectedModelType) {
        if (!selectedModelType)
          return <AngryJoe text="Pick a work model!" />;
    
        const Model = Models[selectedModelType];
    
       return <Model />;
      }
}
