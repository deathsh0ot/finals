import React from 'react';
import PropTypes from 'prop-types';

const Component = ({ idx, componentState, handleComponentChange }) => {
    const ComponentId = `name-${idx}`;
    const ageId = `age-${idx}`;
    return (
        <div key={`component-${idx}`}>
            <label htmlFor={ComponentId}>{`Component #${idx + 1}`}</label>
            <input
                type="text"
                name={ComponentId}
                data-idx={idx}
                id={ComponentId}
                className="name"
                value={componentState[idx].name}
                onChange={handleComponentChange}
            />
            <label htmlFor={ageId}>Age</label>
            <input
                type="text"
                name={ageId}
                data-idx={idx}
                id={ageId}
                className="age"
                value={componentState[idx].age}
                onChange={handleComponentChange}
            />
        </div>
    );
};

Component.propTypes = {
    idx: PropTypes.number,
    componentState: PropTypes.array,
    handleComponentChange: PropTypes.func,
};

export default Component;