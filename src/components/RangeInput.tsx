import { useEffect, useRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const INITIAL_POSITION = 10.5;

const RangeInput = (props: InputProps) => {
  const [value, setValue] = useState(Number(props.min));
  const [tooltipPosition, setTooltipPosition] = useState(-INITIAL_POSITION);
  const rangeRef = useRef(null);

  useEffect(() => {
    const range = rangeRef.current! as HTMLInputElement;
    const rangeWidth = range.getBoundingClientRect().width - 16;
    const percentage = (value - Number(range.min)) / (Number(range.max) - Number(range.min));
    const position = percentage * rangeWidth;

    setTooltipPosition(position - INITIAL_POSITION);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 leading-none">
      <label htmlFor={props.id}>
        {props.label}
      </label>

      <div>
        <div className="flex justify-between text-xs pt-2">
          <span className="pl-1">{props.min}</span>
          <span>{props.max}</span>
        </div>

        <div className="relative h-0 w-full">
          <input
            ref={rangeRef}
            {...props}
            type="range"
            defaultValue={props.min}
            className="appearance-none bg-[#CBB6E5] h-1 rounded-lg range w-full"
            step="1"
            onChange={(e) => setValue(Number((e.target as HTMLInputElement).value))}
          />

          <div
            className="absolute top-[32px] bg-[#FAF9FA] rounded border border-[#CBB6E5] w-[37px] h-[25px] flex items-center justify-center text-xs tooltip"
            style={{ left: `${tooltipPosition}px` }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
