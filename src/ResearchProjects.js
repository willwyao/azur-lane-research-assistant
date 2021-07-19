import React from "react";
import { useGlobalContext } from "./context";

const getOptionIdList = (attributes) => {
  let optionIdList = [];

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

const getOptionValue = (optionId, storedOptions) => {
  return storedOptions.find((option) => option.id === optionId).value;
};

const getOptionTitle = (optionId, storedOptions) => {
  if (optionId) {
    return storedOptions.find((option) => option.id === optionId).title;
  } else {
    return "";
  }
};

const getProjectValue = (attributes, storedOptions) => {
  let finalValue = 0;

  //load option values into each project
  let projectValueList = getOptionIdList(attributes).map((optionId) => {
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

const generateProjectLabel = (attributes, storedOptions, defaultLabel) => {
  let season = "";
  let type = "";
  let colour = "";
  let scale = "";
  let ship = "";
  let time = "";

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
  if (type === "") {
    return defaultLabel;
  } else {
    return `${season}${colour}${scale}${ship}${type}-${time}H`;
  }
};

const getFilterProjectsByAttrs = (projects, attrs) => {
  let filteredProjects = projects;
  attrs.forEach((attr) => {
    const { name, value } = attr;
    if (value === "0") {
      return;
    } else {
      if (name === "cost") {
        filteredProjects = filteredProjects.filter((project) =>
          project.attributes[name].includes(value)
        );
      } else {
        filteredProjects = filteredProjects.filter(
          (project) => project.attributes[name] === value
        );
      }
    }
  });
  return filteredProjects;
};

const ResearchProjects = () => {
  const { options, specialOptions, projects } = useGlobalContext();
  let tiers = [];
  let currentTier = [];
  let currentValue = 0;

  let outputProjects = projects.map((project) => {
    const finalValue = getProjectValue(project.attributes, options);
    const projectLabel = generateProjectLabel(
      project.attributes,
      options,
      project.projectName
    );

    return {
      id: project.id,
      name: projectLabel,
      value: finalValue,
      attributes: project.attributes,
      colour: project.attributes.colour,
    };
  });

  //apply special priority settings
  specialOptions.forEach((spOption) => {
    const { enabled, tier, conditions } = spOption;
    if (enabled) {
      const filteredProjectIds = getFilterProjectsByAttrs(
        outputProjects,
        conditions
      ).map((item) => item.id);
      outputProjects.forEach((project) => {
        if (filteredProjectIds.includes(project.id)) {
          project.value = 1000 * (7 - tier);
        }
      });
    }
  });

  //sort projects' list as DESC
  outputProjects.sort((a, b) => b.value - a.value);

  //put projects into different tiers
  outputProjects.forEach((project) => {
    if (currentValue !== project.value) {
      currentTier = [];
      currentTier.push(project);
      tiers.push(currentTier);
      currentValue = project.value;
    } else {
      currentTier.push(project);
    }
  });

  return (
    <div className="container">
      <h3>优先级计算结果</h3>
      <div className="projects-container ">
        {tiers.map((tier, index) => {
          return (
            <div className={`tier-${index} row mb-1`} key={index}>
              {tier.map((project, index) => {
                return (
                  <div className="project col-sm-6 col-lg-4" key={index}>
                    <div className={`project-inner bg-${project.colour}`}>
                      {/* <span>#{project.id}</span> */}
                      <span className="project-name">{project.name}:</span>
                      <span className="project-value">{project.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResearchProjects;
