import React, { useState, useContext, useEffect } from "react";
import defaultOptions from "./defaultOptions.json";
import defaultOptionClasses from "./defaultOptionClasses.json";
import defaultProjects from "./defaultProjects.json";

const version = "2.0";
const defaultSpOptions = { priority: Array(6).fill("0") };
const optionValueList = [0, 1, 2, 3, 4, 5, 6, 50, 99];

const AppContext = React.createContext();

const getStoredData = (name) => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedData = localStorage.getItem(name);
  if (storedVersion && storedData) {
    storedData = JSON.parse(localStorage.getItem(name));
    if (storedVersion === version) {
      return storedData;
    } else {
      localStorage.removeItem(name);
      return false;
    }
  } else {
    return false;
  }
};

const AppProvider = ({ children }) => {
  const [options, setOptions] = useState(
    getStoredData("azur_options")
      ? getStoredData("azur_options")
      : defaultOptions
  );
  const [optionClasses, setOptionClasses] = useState(
    getStoredData("azur_option_classes")
      ? getStoredData("azur_option_classes")
      : defaultOptionClasses
  );
  const [specialOptions, setSpecialOptions] = useState(
    getStoredData("azur_sp_options")
      ? getStoredData("azur_sp_options")
      : defaultSpOptions
  );
  const [projects, setProjects] = useState(
    getStoredData("azur_projects")
      ? getStoredData("azur_projects")
      : defaultProjects
  );

  //load options from an option id array
  const loadOptionsFromClass = (optionClass, options) => {
    return options.filter(
      (option) => optionClass.optionIds.indexOf(option.id) !== -1
    );
  };

  useEffect(() => {
    localStorage.setItem("azur_version", version);
    localStorage.setItem("azur_options", JSON.stringify(options));
    localStorage.setItem("azur_sp_options", JSON.stringify(specialOptions));
  }, [options, specialOptions]);
  return (
    <AppContext.Provider
      value={{
        options,
        optionClasses,
        specialOptions,
        projects,
        optionValueList,
        version,
        setOptions,
        setOptionClasses,
        setSpecialOptions,
        setProjects,
        loadOptionsFromClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
