import TextInput from "./components/TextInput.tsx";
import RangeInput from "./components/RangeInput.tsx";
import FileInput from "./components/FileInput.tsx";
import DateTimeInput from "./components/DateTimeInput.tsx";

function App() {
  const isActive = false;
  const activeClass = isActive
    ? "bg-[#761BE4] hover:bg-[#6A19CD] cursor-pointer"
    : "bg-[#CBB6E5] cursor-not-allowed";

  return (
    <div className="mx-auto w-[426px] py-30 flex flex-col gap-6">
      <h1 className="text-2xl pb-2">
        Personal info
      </h1>

      <TextInput id="first-name" label="First Name" />

      <TextInput id="last-name" label="Last Name" />

      <TextInput id="email" label="Email Address" type="email" />

      <RangeInput
        id="age"
        label="Age"
        min="8"
        max="100"
        step="1"
      />

      <FileInput
        id="photo"
        label="Photo"
        type="file"
      />

      <h1 className="text-2xl py-2">
        Your workout
      </h1>

      <DateTimeInput />

      <button className={`w-full h-[45px]  text-white rounded-[5px] ${activeClass} text-center`}>
        Send Application
      </button>
    </div>
  );
}

export default App;
