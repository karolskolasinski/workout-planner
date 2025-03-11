import TextInput from "./components/TextInput.tsx";

function App() {
  return (
    <div className="mx-auto w-[426px] py-30 flex flex-col gap-6">
      <h1 className="text-2xl pb-2">
        Personal info
      </h1>

      <TextInput id="first-name" label="First Name" />

      <TextInput id="last-name" label="Last Name" />

      <TextInput id="email" label="Email Address" type="email" />
    </div>
  );
}

export default App;
