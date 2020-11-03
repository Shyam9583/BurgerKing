import classes from "./Input.module.css";
import React from "react";

const input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (!props.valid && props.dirty) {
    inputClasses.push(classes.Error);
  }
  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          name={props.elementConfig.name}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option} value={option}>
              {option.replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
