import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input  
                type={type} 
                name={name}
                placeholder={defaultValue}
                className="input input-bordered w-full max-w-xs">
            </input>
        </label>
    );
};

export default FormInput;