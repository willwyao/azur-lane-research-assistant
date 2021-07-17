import React from "react";
import defaultProjects from "./defaultProjects.json";

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

const ResearchProjects = ({ options, specialOptions }) => {
  let tiers = [];
  let currentTier = [];
  let currentValue = 0;

  let projects = defaultProjects.map((project) => {
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
  projects.forEach((project) => {
    const spPriorityIndex = specialOptions.priority.indexOf(project.id);
    if (spPriorityIndex !== -1) {
      project.value = (spPriorityIndex + 1) * 1000;
    }
  });

  //sort projects' list as DESC
  projects.sort((a, b) => b.value - a.value);

  //put projects into different tiers
  projects.forEach((project) => {
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
                      <span>#{project.id}</span>
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
