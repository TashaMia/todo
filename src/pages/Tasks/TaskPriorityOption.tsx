import { Dispatch, SetStateAction } from "react";

export default function TaskPriorityOption(props: {
  option: {
    priority: string;
    style: string;
  };
  setSelectedOption: Dispatch<SetStateAction<string>>;
  selectedOption: string;
  setTaskPriority: Dispatch<SetStateAction<string>>;
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
