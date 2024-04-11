import logo from "./logo.svg";
import "./App.css";
import AppForm from "./components/AppForm/AppForm";

function App() {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-stone-300">
      <header className="text-center flex flex-col items-center justify-start">
        <img src={logo} className="w-24 h-24 mb-4" alt="logo" />
        <h3 className="text-xl font-bold text-zinc-600">
          Paste any text to convert it to PDF
        </h3>
      </header>
      <main className="flex flex-col items-center justify-start w-full">
        <AppForm />
      </main>
    </div>
  );
}

export default App;
