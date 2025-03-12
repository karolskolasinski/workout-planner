import TextInput from "./components/TextInput.tsx";
import RangeInput from "./components/RangeInput.tsx";
import FileInput from "./components/FileInput.tsx";
import DateTimeInput from "./components/DateTimeInput.tsx";

function App() {
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

      <DateTimeInput id="datetime" label="Date" />
    </div>
  );
}

export default App;
