import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CustomInputNumber.css";
// import styled from "styled-components";

const CustomInputNumber = (props) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [disableInput, setDisableInput] = useState(false);
  const [disableDown, setDisableDown] = useState(true);
  const [disableUp, setDisableUp] = useState(false);

  useEffect(() => {
    if (inputValue > props.min) {
      setDisableDown(false);
    } else {
      setDisableDown(true);
    }

    if (inputValue < props.max) {
      setDisableUp(false);
    } else {
      setDisableUp(true);
    }
    props.onChange(inputValue);
    props.onBlur(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setDisableInput(props.disabled);
    setDisableDown(props.disabled);
    setDisableUp(props.disabled);
  }, [disableInput]);

  const onBlurHappen = (value) => {
    if (value > props.min) {
      setDisableDown(false);
    } else {
      setDisableDown(true);
    }

    if (value < props.max) {
      setDisableUp(false);
    } else {
      setDisableUp(true);
    }
  };

  const clickDown = () => {
    if (inputValue > props.min) {
      setInputValue(inputValue - props.step);
    }
  };

  const clickUp = () => {
    // alert("You clicked me!");
    if (inputValue < props.max) {
      setInputValue(inputValue + props.step);
    }
  };

  return (
    <div>
      <div className="square-inline">
        <button
          className="square btn-upDown"
          onClick={() => clickDown()}
          disabled={disableDown}
        >
          -
        </button>

        <input
          className="square square_input"
          type="number"
          min={props.min}
          max={props.max}
          step={props.step}
          name={props.name}
          value={inputValue}
          disabled={disableInput}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={(event) => onBlurHappen(event.target.value)}
        />
        <button
          className="square btn-upDown"
          onClick={() => clickUp()}
          disabled={disableUp}
        >
          +
        </button>
      </div>
      {/* <h1>{inputValue}</h1> */}
    </div>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
CustomInputNumber.defaultProps = {
  step: 1,
  disabled: false,
};

export default CustomInputNumber;
