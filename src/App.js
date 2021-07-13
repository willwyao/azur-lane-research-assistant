// import "./App.css";
import { useState, useEffect } from "react";
import ResearchOptions from "./ResearchOptions";
import ResearchProjects from "./ResearchProjects";
import availableOptions from "./availableOptions";
const version = "1.0";

const getStoredOptions = () => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedOptions = localStorage.getItem("azur_options");
  if (storedVersion && storedOptions) {
    storedOptions = JSON.parse(localStorage.getItem("azur_options"));
    if (storedVersion === version) {
      return storedOptions;
    } else {
      localStorage.removeItem("azur_options");
      return availableOptions;
    }
  } else {
    return availableOptions;
  }
};

function App() {
  const [options, setOptions] = useState(getStoredOptions);
  useEffect(() => {
    localStorage.setItem("azur_version", version);
    localStorage.setItem("azur_options", JSON.stringify(options));
  }, [options]);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">
          碧蓝航线脚本科研助手 <small>v{version}</small>
        </h1>
      </header>
      <ResearchOptions options={options} setOptions={setOptions} />
      <ResearchProjects options={options} />
    </div>
  );
}

export default App;
