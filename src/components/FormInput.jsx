import React from 'react';

const FormInput = ({ label, name, type = 'text', placeholder, required }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default FormInput;