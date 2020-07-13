import React from "react"
import AvField from "availity-reactstrap-validation/lib/AvField"
const unitInputs = (props) => {
  return (
    props.Units.map((val, idx) => {
      let unitId = `unit-${idx}`;
      return (
        <div key={idx}>
          <div className="card card-secondary">
            <div className="card-header">{"Unit number :" + (idx + 1)}</div>
            <div className="card-body">
              <h4>{`unit #${idx + 1}`} </h4>
              <AvField
                label="Unit label"
                placeholder="enter unit name"
                type="text"
                name="unitLabel"
                data-id={idx}
                id={unitId}
                value={props.Units[idx].unitLabel}
                className="unit"
              />
              <AvField
                label="Unit credit"
                placeholder="enter unit credit"
                type="text"
                name="unitcredit"
                data-id={idx}
                id={unitId}
                value={props.Units[idx].unitcredit}
                className="unit"
              />
              <AvField
                label="Unit coefficient"
                placeholder="enter unit coefficient"
                type="text"
                name="unitcoeficient"
                data-id={idx}
                id={unitId}
                value={props.Units[idx].unitcoeficient}
                className="unit"
              />
              <AvField
                label="Unit nature"
                placeholder="enter unit nature"
                type="text"
                name="unitNature"
                data-id={idx}
                id={unitId}
                value={props.Units[idx].unitNature}
                className="unit"
              />
              <AvField
                label="Unit regimen"
                placeholder="enter unit regimen"
                type="text"
                name="unitRegimen"
                data-id={idx}
                id={unitId}
                value={props.Units[idx].unitRegimen}
                className="unit"
              />
            </div>
          </div>
        </div>
      )
    })
  )
}
export default unitInputs