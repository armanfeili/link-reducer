import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({name, value, error, type, options, info, label, onChange, disabled}) => {

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className='form-group'>
      <select
        type={type}
        className={classnames('form-control', {
                     'is-invalid': error
                   })}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}>
        {selectOptions}
      </select>
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && (
       <div className='invalid-feedback'>
         {error}
       </div>)}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired, // ***
  error: PropTypes.string,
  diabled: PropTypes.string,
  info: PropTypes.string
};

export default SelectListGroup;
