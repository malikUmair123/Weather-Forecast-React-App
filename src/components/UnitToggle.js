// src/components/UnitToggle.js
import React from 'react';
import './UnitToggle.css';

const UnitToggle = ({ unit, toggleUnit }) => {
    return (
        <div className="unit-toggle">
            <span>&#176;C</span>
            <label className="switch">
                <input type="checkbox" checked={unit === 'F'} onChange={toggleUnit} />
                <span className="slider"></span>
            </label>
            <span>&#176;F</span>
        </div>
    );
};

export default UnitToggle;
