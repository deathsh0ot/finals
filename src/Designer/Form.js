import React, { useState } from 'react';
import Component from './Component';

const Form = () => {
    const [ownerState, setOwnerState] = useState({
        owner: '',
        description: '',
    });

    const handleOwnerChange = (e) => setOwnerState({
        ...ownerState,
        [e.target.name]: [e.target.value],
    });

    const blankcomponent = { name: '', age: '' };
    const [componentState, setcomponentState] = useState([
        { ...blankcomponent },
    ]);

    const addcomponent = () => {
        setcomponentState([...componentState, { ...blankcomponent }]);
    };

    const handleComponentChange = (e) => {
        const updatedcomponents = [...componentState];
        updatedcomponents[e.target.dataset.idx][e.target.className] = e.target.value;
        setcomponentState(updatedcomponents);
    };

    return (
        <form>
            <label htmlFor="owner">Owner</label>
            <input
                type="text"
                name="owner"
                id="owner"
                value={ownerState.owner}
                onChange={handleOwnerChange}
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={ownerState.description}
                onChange={handleOwnerChange}
            />
            <input
                type="button"
                value="Add New Component"
                onClick={addcomponent}
            />
            {
                componentState.map((val, idx) => (
                    <Component
                        key={`component-${idx}`}
                        idx={idx}
                        componentState={componentState}
                        handleComponentChange={handleComponentChange}
                    />
                ))
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;