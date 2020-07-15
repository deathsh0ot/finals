import React from "react"
import AvField from "availity-reactstrap-validation/lib/AvField"
const subjectInputs = (props) => {
  return (
    props.Subjects.map((val, idx) => {
      let subjectId = `subject-${idx}`;
      return (
        <div key={idx}>
          <div className="card card-primary">
            <div className="card-header">{"subject number :" + (idx + 1)}</div>
            <div className="card-body">
              <h4>{`subject #${idx + 1}`} </h4>
              <AvField
                label="subject label"
                placeholder="enter subject name"
                type="text"
                name="subjectlabel"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectlabel}
                className="subject"
              />
              <AvField
                label="subject credit"
                placeholder="enter subject credit"
                type="text"
                name="subjectcredit"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectcredit}
                className="subject"
              />
              <AvField
                label="subject coefficient"
                placeholder="enter subject coefficient"
                type="text"
                name="subjectCoefficient"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectCoefficient}
                className="subject"
              />
              <AvField
                label="subject regimen"
                placeholder="enter subject regimen"
                type="text"
                name="subjectRegimen"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectRegimen}
                className="subject"
              />
              {/* <AvField
                label="subject course"
                placeholder="enter subject course hours"
                type="text"
                name="subjectcourse"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectcourse}
                className="subject"
              />
              <AvField
                label="subject tutorials"
                placeholder="enter subject tutorials hours"
                type="text"
                name="subjecttutorials"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjecttutorials}
                className="subject"
              />
              <AvField
                label="subject practical works"
                placeholder="enter subject practical works hours"
                type="text"
                name="subjectprac"
                data-id={idx}
                id={subjectId}
                value={props.Subjects[idx].subjectprac}
                className="subject"
              /> */}
            </div>
          </div>
        </div>
      )
    })
  )
}
export default subjectInputs