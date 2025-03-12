import { useState } from "react";
import { infoBox } from "./infoBox.tsx";
import _ from "lodash";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onTextInput: (value: ((prevState: string) => string) | string) => void;
}

const TextInput = (props: InputProps) => {
  const cleanProps = _.omit(props, ["onTextInput"]);
  const [errorMsg, setErrorMsg] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorMsg(e.target.validationMessage);
    if (e.target.validity.valid) {
      setErrorMsg("");
      props.onTextInput(value);
    }
  };

  const borderClass = errorMsg ? "border-[#ED4545] border-2" : "border-[#CBB6E5]";
  const bgClass = errorMsg ? "bg-[#FEECEC]" : "bg-white";

  return (
    <div className="flex flex-col gap-2 leading-none">
      <label htmlFor={props.id}>
        {props.label}
      </label>

      <input
        {...cleanProps}
        className={`${bgClass} h-12 rounded-lg border ${borderClass} p-4 focus:outline-2 focus:outline-[#761BE4]`}
        onChange={onChangeHandler}
      />

      {errorMsg && infoBox("error", errorMsg)}
    </div>
  );
};

export default TextInput;
