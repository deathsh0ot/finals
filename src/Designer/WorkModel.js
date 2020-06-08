import React, { Component, Fragment } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import AngryJoe from './FormComponents/AngryJoe';
export default class WorkModel extends Component {
    state={
        selectedCardType:''
    };
    render() {
        return (
            <Fragment>
                <section>
                    {/* Select a Work Model Here */}
                    {this.renderWorkModelSelector()}

                    {/* Dynamic component rendered here ! */}
                    {this.renderSelectedCard(this.state.selectedCardType)}
                </section>
            </Fragment>
        )
    }
    renderWorkModelSelector(){
        return(
            <div className="form-group">
                <AvField type="select"
                 label="Select work model" 
                 name="select"
                 onChange={(e) => this.setState({ selectedCardType: e.target.value })}
                 >
                    <option></option>
                    <option>WorkModelA</option>
                    <option>WorkModelB</option>
                </AvField>

            </div>
        )
    }
    renderSelectedCard(selectedCardType) {
        if (!selectedCardType)
          return <AngryJoe text="Pick a work model bruh!" />;
    
        //const Card = Cards[selectedCardType];
    
       // return <Card />;
      }
}
