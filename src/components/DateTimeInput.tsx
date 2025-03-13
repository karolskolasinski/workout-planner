import { useEffect, useState } from "react";
import { addMonths, eachDayOfInterval, format, isEqual, startOfDay, subMonths } from "date-fns";
import { infoBox } from "./infoBox.tsx";
import { TimePicker } from "./TimePicker.tsx";

type InputProps = {
  onDateTimeSelect: (value: ((prevState: Date | null) => Date | null) | Date | null) => void;
};
type DayData = {
  country: string;
  date: string;
  day: string;
  iso: string;
  name: string;
  type: string;
  year: number;
};
type SetEvents = React.Dispatch<React.SetStateAction<DayData[]>>;
type MouseClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchEvents = async (type: string, setState: SetEvents) => {
  try {
    const url = `${API_URL}?country=PL&type=${type}`;
    const response = await fetch(url, { headers: { "X-Api-Key": API_KEY } });
    const data = await response.json();
    setState(data);
  } catch (error) {
    console.error(error);
  }
};

const DateTimeInput = (props: InputProps) => {
  const { onDateTimeSelect } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [infoText, setInfoText] = useState("");
  const [holidays, setHolidays] = useState<DayData[]>([]);
  const [observances, setObservances] = useState<DayData[]>([]);

  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = eachDayOfInterval({ start, end });

  const firstDayIndex = start.getDay();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrevMonth = (e: MouseClickEvent) => {
    e.preventDefault();
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDate(null);
    setInfoText("");
    onDateTimeSelect(null);
  };
  const handleNextMonth = (e: MouseClickEvent) => {
    e.preventDefault();
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDate(null);
    setInfoText("");
    onDateTimeSelect(null);
  };

  const handleDateSelect = (e: MouseClickEvent, day: Date) => {
    e.preventDefault();
    let infoText: string;
    const selectedDate = startOfDay(day);
    const holiday = holidays.find((holiday) => {
      const holidayDate = startOfDay(new Date(holiday.date));
      return isEqual(holidayDate, selectedDate);
    });
    infoText = holiday ? "It is " + holiday.name : "";

    const observance = observances.find((observance) => {
      const observanceDate = startOfDay(new Date(observance.date));
      return isEqual(observanceDate, selectedDate);
    });
    if (holiday && observance) {
      infoText += " and ";
    }
    infoText += observance ? "It is " + observance.name : "";

    setInfoText(infoText);
    const isSunday = day.getDay() === 0;
    if (!holiday && !isSunday) {
      setSelectedDate(day);
    } else {
      setSelectedDate(null);
      onDateTimeSelect(null);
    }
  };

  useEffect(() => {
    fetchEvents("national_holiday", setHolidays);
    fetchEvents("observance", setObservances);
  }, [currentDate]);

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
                className="min-w-4 h-4 fill-[#CBB6E5] hover:fill-[#761BE4] cursor-pointer"
              >
                <path d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51888 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z" />
              </svg>
            </button>

            <span className="col-span-5">{format(currentDate, "MMMM yyyy")}</span>

            <button onClick={handleNextMonth} className="flex justify-center">
              <svg
                viewBox="0 0 11 14"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-4 h-4 fill-[#CBB6E5] hover:fill-[#761BE4] cursor-pointer"
              >
                <path d="M10.5 7.86602C11.1667 7.48112 11.1667 6.51888 10.5 6.13397L1.5 0.937821C0.833334 0.552921 6.10471e-07 1.03405 5.76822e-07 1.80385L1.2256e-07 12.1962C8.8911e-08 12.966 0.833333 13.4471 1.5 13.0622L10.5 7.86602Z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm">
            {WEEKDAYS.map((day) => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 text-center mt-2">
            {Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {daysInMonth.map((d: Date, i: number) => {
              const normalizedDate = startOfDay(d);

              const isSelected = selectedDate
                ? isEqual(startOfDay(selectedDate), normalizedDate)
                : false;
              const isHoliday = holidays.some((holiday: DayData) => {
                const holidayDate = startOfDay(new Date(holiday.date));
                return isEqual(holidayDate, normalizedDate);
              });
              const isObservance = observances.some((observance: DayData) => {
                const observanceDate = startOfDay(new Date(observance.date));
                return isEqual(observanceDate, normalizedDate);
              });
              const isSunday = d.getDay() === 0;
              const isToday = isEqual(startOfDay(new Date()), normalizedDate);

              let statusClass = "";
              if (isSelected) {
                statusClass = "bg-[#761BE4] text-white";
              } else if (isHoliday || isSunday || isToday || isObservance) {
                statusClass = "text-[#898DA9]";
              }

              return (
                <button
                  key={`day-${i}`}
                  onClick={(e) => handleDateSelect(e, d)}
                  className={`w-8 h-8 m-0.5 text-center rounded-full cursor-pointer outline-none hover:bg-[#761BE4] hover:text-white ${statusClass}`}
                >
                  {format(d, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {infoText && infoBox("info", infoText)}
      </div>

      {selectedDate && (
        <TimePicker
          onDateTimeSelect={props.onDateTimeSelect}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default DateTimeInput;
