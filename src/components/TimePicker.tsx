import { useState } from "react";

interface TimePickerProps {
  onDateTimeSelect: (value: ((prevState: Date | null) => Date | null) | Date | null) => void;
  selectedDate: Date;
}

export const TimePicker = (props: TimePickerProps) => {
  const { onDateTimeSelect, selectedDate } = props;
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectTimeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const time = e.currentTarget.textContent;
    if (time) {
      setSelectedTime(time);
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onDateTimeSelect(newDate);
    } else {
      setSelectedTime(null);
      onDateTimeSelect(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 leading-none">
      Time

      <div className="flex flex-wrap sm:flex-col gap-2">
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
        onClick={selectTimeHandler}
      >
        {label}
      </button>
    );
  }
};
