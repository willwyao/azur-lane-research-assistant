import React, { useState, useContext, useEffect } from "react";
import defaultOptions from "./defaultOptions.json";
import defaultOptionClasses from "./defaultOptionClasses.json";
import defaultProjects from "./defaultProjects.json";

const AppContext = React.createContext();

const version = "3.0";
const dataVersion = "3.0";
const spClasses = ["season", "type", "colour", "scale"];
const optionValueList = [0, 1, 2, 3, 4, 5, 6, 50, 99];

const getStoredData = (name) => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedData = localStorage.getItem(name);
  if (storedVersion && storedData) {
    storedData = JSON.parse(localStorage.getItem(name));
    if (storedVersion === dataVersion) {
      return storedData;
    } else {
      localStorage.removeItem(name);
      return false;
    }
  } else {
    return false;
  }
};

const getDefaultSpOptions = (spClasses) => {
  const length = 6;
  let spOptions = [];
  for (let index = length; index > 0; index--) {
    let tempOption = {
      enabled: false,
      tier: index,
      conditions: spClasses.map((item) => {
        return { name: item, value: "0" };
      }),
    };
    spOptions.push(tempOption);
  }
  return spOptions;
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
      : getDefaultSpOptions(spClasses)
  );
  const [projects, setProjects] = useState(
    getStoredData("azur_projects")
      ? getStoredData("azur_projects")
      : defaultProjects
  );
  const [enableEditor, setEnableEditor] = useState(false);
  const [itemEditor, setItemEditor] = useState("0");

  //format stored project
  const formatProjects = (projects, options) => {
    return projects.map((project) => {
      const finalValue = getProjectValue(project, options);

      return {
        id: project.id,
        name: project.projectName,
        value: finalValue,
        attributes: project.attributes,
        colour: project.attributes.colour,
      };
    });
  };

  const getProjectValue = (project, storedOptions) => {
    let finalValue = 0;

    //load option values into each project
    let projectValueList = getOptionIdList(project).map((optionId) => {
      return getOptionValue(optionId, storedOptions);
    });

    //calculate project final value
    if (projectValueList.indexOf(0) === -1) {
      return (finalValue = projectValueList.reduce(
        (accumulator, currentValue) => {
          return parseInt(accumulator) + parseInt(currentValue);
        }
      ));
    } else {
      return finalValue;
    }
  };

  const generateProjectLabel = (storedProject, storedOptions) => {
    let season = "";
    let type = "";
    let colour = "";
    let scale = "";
    let ship = "";
    let time = "";
    const { attributes } = storedProject;

    for (let key in attributes) {
      switch (key) {
        case "season":
          season = getOptionTitle(attributes[key], storedOptions);
          break;
        case "type":
          type = getOptionTitle(attributes[key], storedOptions);
          break;

        case "colour":
          colour = getOptionTitle(attributes[key], storedOptions);
          break;

        case "scale":
          scale = getOptionTitle(attributes[key], storedOptions);
          break;
        case "ship":
          ship = getOptionTitle(attributes[key], storedOptions).slice(2);
          break;
        case "time":
          time = attributes[key];
          break;

        default:
          break;
      }
    }

    return `${season}${colour}${scale}${ship}${type}-${time}H`;
  };

  const getOptionTitle = (optionId, storedOptions) => {
    if (optionId && optionId !== "0") {
      return storedOptions.find((option) => option.id === optionId).title;
    } else {
      return "";
    }
  };

  const getOptionValue = (optionId, storedOptions) => {
    if (optionId && optionId !== "0") {
      return storedOptions.find((option) => option.id === optionId).value;
    } else {
      return 0;
    }
  };

  const getOptionIdList = (project) => {
    let optionIdList = [];
    const { attributes } = project;

    //load options' values
    for (let key in attributes) {
      if (key === "cost") {
        attributes[key].forEach((value) => {
          optionIdList.push(value);
        });
        continue;
      }
      if (key === "time") {
        continue;
      }
      if (attributes[key] !== null) {
        optionIdList.push(attributes[key]);
      }
    }

    return optionIdList;
  };

  //load options from an option id array
  const loadOptionsFromClass = (optionClass, options) => {
    return options.filter(
      (option) => optionClass.optionIds.indexOf(option.id) !== -1
    );
  };

  const resetProjects = () => {
    setProjects(defaultProjects);
  };

  const deleteProject = (id) => {
    let newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
  };

  useEffect(() => {
    localStorage.setItem("azur_version", dataVersion);
    localStorage.setItem("azur_options", JSON.stringify(options));
    localStorage.setItem("azur_sp_options", JSON.stringify(specialOptions));
    localStorage.setItem("azur_projects", JSON.stringify(projects));
    console.log(projects);
  }, [options, specialOptions, projects]);
  return (
    <AppContext.Provider
      value={{
        options,
        optionClasses,
        specialOptions,
        projects,
        optionValueList,
        version,
        enableEditor,
        itemEditor,
        setOptions,
        setOptionClasses,
        setSpecialOptions,
        setProjects,
        setEnableEditor,
        setItemEditor,
        loadOptionsFromClass,
        generateProjectLabel,
        formatProjects,
        resetProjects,
        deleteProject,
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
