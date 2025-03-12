import { useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import { TimePicker } from "./TimePicker.tsx";

const DateTimeInput = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = startOfMonth.getDay();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleDateSelect = (day: number) => setSelectedDate(day);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2 leading-none">
        Date

        <div className="w-[326px] p-4 bg-white rounded-lg leading-none text-[#000853] border border-[#CBB6E5]">
          <div className="grid grid-cols-7 h-8 items-center text-center mb-8">
            <button onClick={handlePrevMonth} className="flex justify-center">
              <svg
                viewBox="0 0 11 14"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-4 h-4 fill-[#CBB6E5] hover:fill-[#761BE4]"
              >
                <path d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51888 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z" />
              </svg>
            </button>

            <span className="col-span-5">{format(currentDate, "MMMM yyyy")}</span>

            <button onClick={handleNextMonth} className="flex justify-center">
              <svg
                viewBox="0 0 11 14"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-4 h-4 fill-[#CBB6E5] hover:fill-[#761BE4]"
              >
                <path d="M10.5 7.86602C11.1667 7.48112 11.1667 6.51888 10.5 6.13397L1.5 0.937821C0.833334 0.552921 6.10471e-07 1.03405 5.76822e-07 1.80385L1.2256e-07 12.1962C8.8911e-08 12.966 0.833333 13.4471 1.5 13.0622L10.5 7.86602Z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 text-center mt-2">
            {Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate === day;
              const indicator = "hover:bg-[#761BE4] hover:text-white";
              const selectedClass = isSelected ? "bg-[#761BE4] text-white" : "";
              const today = new Date();
              const isToday = currentDate.getMonth() === today.getMonth() &&
                day === today.getDate();
              const holidayClass = isToday ? "text-[#898DA9]" : "";

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`w-8 h-8 m-0.5 flex items-center justify-center rounded-full ${indicator} ${selectedClass} ${holidayClass}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && <TimePicker />}
    </div>
  );
};

export default DateTimeInput;
