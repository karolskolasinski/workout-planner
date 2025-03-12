import TextInput from "./components/TextInput.tsx";
import RangeInput from "./components/RangeInput.tsx";
import FileInput from "./components/FileInput.tsx";
import DateTimeInput from "./components/DateTimeInput.tsx";
import { useEffect, useState } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);
  const activeClass = isActive
    ? "bg-[#761BE4] hover:bg-[#6A19CD] cursor-pointer"
    : "bg-[#CBB6E5] cursor-not-allowed";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(8);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  useEffect(() => {
    const isFormComplete = firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      age >= 8 &&
      selectedFile !== null &&
      selectedDateTime !== null;

    setIsActive(isFormComplete);
  }, [firstName, lastName, email, age, selectedFile, selectedDateTime]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first-name", firstName);
    formData.append("last-name", lastName);
    formData.append("email", email);
    formData.append("age", age.toString());
    formData.append("photo", selectedFile as Blob);
    formData.append("date-time", selectedDateTime?.toISOString() as string);

    // console group
    console.group("Form Data");
    for (const [key, value] of formData.entries()) {
      console.log(key, key === "photo" ? (value as File).name : value);
    }
    console.groupEnd();
  };

  return (
    <form className="mx-auto w-[426px] py-30 flex flex-col gap-6" onSubmit={onSubmitHandler}>
      <h1 className="text-2xl pb-2">
        Personal info
      </h1>

      <TextInput
        id="first-name"
        name="first-name"
        label="First Name"
        required={true}
        onTextInput={setFirstName}
      />

      <TextInput
        id="last-name"
        name="last-name"
        label="Last Name"
        required={true}
        onTextInput={setLastName}
      />

      <TextInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        required={true}
        onTextInput={setEmail}
      />

      <RangeInput
        id="age"
        name="age"
        label="Age"
        min="8"
        max="100"
        step="1"
        required={true}
        onRangeInput={setAge}
      />

      <FileInput
        id="photo"
        name="photo"
        label="Photo"
        type="file"
        required={true}
        onFileSelect={setSelectedFile}
      />

      <h1 className="text-2xl py-2">
        Your workout
      </h1>

      <DateTimeInput onDateTimeSelect={setSelectedDateTime} />

      <button className={`w-full h-[45px]  text-white rounded-[5px] ${activeClass} text-center`}>
        Send Application
      </button>
    </form>
  );
}

export default App;
