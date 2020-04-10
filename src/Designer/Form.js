import React, { useState } from 'react';
import Component from './Component';

const Form = () => {
    const [cuurriculumState, setCuurriculumState] = useState({
        cuurriculum: '',
        description: '',
    });

    const handleCuurriculumChange = (e) => setCuurriculumState({
        ...cuurriculumState,
        [e.target.name]: [e.target.value],
    });

    const blankcomponent = { name: '', type: '' };
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
        <div className="card card-primary">
            <div className="card-header">Curriculum Model form</div>
            <form>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="cuurriculum">Cuurriculum Name</label>
                        <input
                            type="text"
                            name="cuurriculum"
                            id="cuurriculum"
                            value={cuurriculumState.cuurriculum}
                            onChange={handleCuurriculumChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={cuurriculumState.description}
                            onChange={handleCuurriculumChange}
                            className="form-control"
                        />
                    </div>
                    <div className="card card-primary">
                        <div className="card-header" style={{ backgroundColor: '#ff6200' }}>Component form</div>
                        <div className="card-body">
                            {
                                componentState.map((val, idx) => (
                                    <Component
                                        key={`component-${idx}`}
                                        idx={idx}
                                        componentState={componentState}
                                        handleComponentChange={handleComponentChange}
                                        className="form-control"
                                    />
                                ))
                            }
                        </div>
                        <div className="form-group">
                            <input
                                type="button"
                                value="Add New Component"
                                onClick={addcomponent}
                                className="btn btn-default float-center"
                            />
                        </div>
                    </div>
                    <br /><br />

                    <div>
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;