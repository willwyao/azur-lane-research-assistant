// import "./App.css";
import { useState, useEffect } from "react";
import ResearchOptions from "./ResearchOptions";
import ResearchProjects from "./ResearchProjects";
import defaultOptions from "./defaultOptions.json";
import SpecialOptions from "./SpecialOptions";
import defaultOptionClasses from "./defaultOptionClasses.json";

const version = "1.3";

const getStoredOptions = () => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedOptions = localStorage.getItem("azur_options");
  if (storedVersion && storedOptions) {
    storedOptions = JSON.parse(localStorage.getItem("azur_options"));
    if (storedVersion === version) {
      return storedOptions;
    } else {
      localStorage.removeItem("azur_options");
      return defaultOptions;
    }
  } else {
    return defaultOptions;
  }
};

const getSpecialOptions = () => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedSpOptions = localStorage.getItem("azur_sp_options");
  if (storedVersion && storedSpOptions) {
    storedSpOptions = JSON.parse(localStorage.getItem("azur_sp_options"));
    if (storedVersion === version) {
      return storedSpOptions;
    } else {
      localStorage.removeItem("azur_sp_options");
      return {
        priority: Array(6).fill("0"),
      };
    }
  } else {
    return { priority: Array(6).fill("0") };
  }
};

function App() {
  const [options, setOptions] = useState(getStoredOptions());
  const [specialOptions, setSpecialOptions] = useState(getSpecialOptions());
  const optionClasses = defaultOptionClasses;

  useEffect(() => {
    localStorage.setItem("azur_version", version);
    localStorage.setItem("azur_options", JSON.stringify(options));
    localStorage.setItem("azur_sp_options", JSON.stringify(specialOptions));
  }, [options, specialOptions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">
          碧蓝航线脚本科研助手 <small>v{version}</small>
        </h1>
      </header>
      <ResearchOptions
        options={options}
        optionClasses={optionClasses}
        setOptions={setOptions}
      />
      <SpecialOptions
        specialOptions={specialOptions}
        setSpecialOptions={setSpecialOptions}
      />
      <ResearchProjects options={options} specialOptions={specialOptions} />
    </div>
  );
}

export default App;
