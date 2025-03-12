import { useState } from "react";

export const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2 leading-none">
      Time

      <div className="flex flex-col gap-2">
        {timeRow("12:00")}
        {timeRow("14:00")}
        {timeRow("16:30")}
        {timeRow("18:30")}
        {timeRow("20:00")}
      </div>
    </div>
  );

  function timeRow(label: string) {
    const isSelected = selectedTime === label;
    const selectedClass = isSelected ? "border-2 !border-[#761BE4]" : "";

    return (
      <button
        className={`bg-white border border-[#CBB6E5] rounded-lg hover:border-2 hover:border-[#761BE4] hover:cursor-pointer h-[46px] w-[76px] ${selectedClass}`}
        onClick={() => setSelectedTime(label)}
      >
        {label}
      </button>
    );
  }
};
