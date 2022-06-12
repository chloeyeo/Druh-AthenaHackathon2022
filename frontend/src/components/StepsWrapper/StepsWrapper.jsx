import React from "react";
import "./StepsWrapper.scss";
import StepItem from "../StepItem/StepItem";

const StepsWrapper = (props) => {
  const steps = [
    {
      number: 1,
      text: "About you",
    },
    {
      number: 2,
      text: "About your child",
    },
    {
      number: 3,
      text: "Verify",
    },
    {
      number: 4,
      text: "Confirm",
    },
  ];

  return (
    <div className="stepsWrapper">
      {steps.map((step, i) => (
        <StepItem
          stepNumber={step.number}
          text={step.text}
          isActive={step.number <= props.activeStep}
        />
      ))}
    </div>
  );
};

export default StepsWrapper;
