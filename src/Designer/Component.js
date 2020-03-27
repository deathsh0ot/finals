import React from 'react';
import PropTypes from 'prop-types';

const Component = ({ idx, componentState, handleComponentChange }) => {
    const ComponentId = `name-${idx}`;
    const typeId = `type-${idx}`;
    return (
        <div class="card-body">
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
                    class="form-control"
                />
            </div>
            <div >
                <label htmlFor={typeId}>Type</label>
                <input
                    type="text"
                    name={typeId}
                    data-idx={idx}
                    id={typeId}
                    className="type"
                    value={componentState[idx].type}
                    onChange={handleComponentChange}
                    class="form-control"
                />
            </div>
        </div>
    );
};

Component.propTypes = {
    idx: PropTypes.number,
    componentState: PropTypes.array,
    handleComponentChange: PropTypes.func,
};

export default Component;