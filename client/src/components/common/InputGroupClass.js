import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class InputGroup extends Component {
  constructor({
    name,
    value,
    placeholder,
    label,
    error,
    info,
    type,
    onChange,
    disabled,
    icon
  }) {
    super();
    this.state = {
      name,
      value,
      placeholder,
      label,
      error,
      info,
      type,
      onChange,
      disabled,
      icon
    };
  }

  render() {
    return (
      <div className="input-field">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-icon">
              <i className={this.props.icon} />
            </span>
          </div>
          <input
            type={this.props.type}
            className={classnames("form-control", {
              "is-invalid": this.props.error // if error was true, 'is-invalid' will be added to className,if error was false, it will be ignored
            })}
            placeholder={this.props.placeholder}
            name={this.props.name}
            label={this.props.label}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
          />
          {this.props.info && (
            <small className="form-text text-muted">{this.props.info}</small>
          )}
          {this.props.error && (
            <div className="invalid-feedback">{this.props.error}</div>
          )}
        </div>
      </div>
    );
  }
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

// import React from 'react'
// import classnames from 'classnames'
// import PropTypes from 'prop-types'

// const InputGroup = ({ name, value, placeholder, label, error, info, type, onChange, disabled, icon }) => {
//     return (
//         <div className=''>
//             <div className='input-group'>
//                 <div className='input-group-prepend'>
//                     <span className='input-group-icon'><i className={icon}></i></span>
//                 </div>
//                 <input
//                     type={type}
//                     className={classnames('form-control', {
//                         'is-invalid': error // if error was true, 'is-invalid' will be added to className,if error was false, it will be ignored
//                     })}
//                     placeholder={placeholder}
//                     name={name}
//                     label={label}
//                     value={value}
//                     onChange={onChange}
//                     disabled={disabled} />
//                 {info && <small className='form-text text-muted'>{info}</small>}
//                 {error && (
//                     <div className='invalid-feedback'>
//                         {error}
//                     </div>)}
//             </div>
//         </div>
//     )
// }

// InputGroup.propTypes = {
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     info: PropTypes.string,
//     error: PropTypes.string,
//     disabled: PropTypes.bool
// }

// InputGroup.defaultProps = {
//     type: 'text'
// }

// export default InputGroup
