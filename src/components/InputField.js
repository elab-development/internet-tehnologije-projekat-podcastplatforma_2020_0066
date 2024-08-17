import React from 'react';

const InputField = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;