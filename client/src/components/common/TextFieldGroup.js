import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ name, value, placeholder, label, error, info, type, onChange, disabled}) => {
  return (
    <div className='formGroup'>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        label={label}
        className={classnames('form-control', {
                     'is-invalid': error // if error was true, 'is-invalid' will be added to className,if error was false, it will be ignored
                   })}
        onChange={onChange}
        disabled={disabled} />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && (
       <div className='invalid-feedback'>
         {error}
       </div>)}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export default TextFieldGroup;
