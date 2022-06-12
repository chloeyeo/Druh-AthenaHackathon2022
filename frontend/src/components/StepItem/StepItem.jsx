import React from "react";
import "./StepItem.scss";

const StepItem = (props) => {
  return (
    <div className="stepItemWrapper">
      <div
        className={
          "stepItem" +
          (props.isActive ? " active" : "") +
          (props.stepNumber !== 1 ? " line" : "")
        }>
        <span>{props.stepNumber}</span>
      </div>
      <p className={props.isActive ? "active" : ""}>{props.text}</p>
    </div>
  );
};

export default StepItem;
