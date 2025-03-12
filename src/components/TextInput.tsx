import { useState } from "react";
import { infoBox } from "./infoBox.tsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput = (props: InputProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const borderClass = errorMsg ? "border-[#ED4545] border-2" : "border-[#CBB6E5]";
  const bgClass = errorMsg ? "bg-[#FEECEC]" : "bg-white";

  return (
    <div className="flex flex-col gap-2 leading-none">
      <label htmlFor={props.id}>
        {props.label}
      </label>

      <input
        {...props}
        className={`${bgClass} h-12 rounded-lg border ${borderClass} p-4 focus:outline-2 focus:outline-[#761BE4]`}
        onChange={(e) => setErrorMsg(e.target.validationMessage)}
      />

      {errorMsg && infoBox("error", errorMsg)}
    </div>
  );
};

export default TextInput;
