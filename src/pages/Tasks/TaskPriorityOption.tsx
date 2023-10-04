import { useState } from "react";

export default function TaskPriorityOption(props: {
  option: any;
  setSelectedOption: any;
  selectedOption: any;
  setTaskPriority: any;
}) {
  return (
    <button
      className="option"
      onClick={() => {
        props.setSelectedOption(props.option.style);
        props.setTaskPriority(props.option.priority);
      }}
    >
      <div className={`option-color  ${props.option.style}`}>
        <div
          className={
            props.option.style == props.selectedOption
              ? `selected-${props.selectedOption}`
              : " "
          }
        ></div>
      </div>
      <p>{props.option.priority}</p>
    </button>
  );
}
