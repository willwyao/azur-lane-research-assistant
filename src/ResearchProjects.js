import React from "react";
import { useGlobalContext } from "./context";

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
  const { options, specialOptions, projects, formatProjects } =
    useGlobalContext();
  let tiers = [];
  let currentTier = [];
  let currentValue = 0;

  let outputProjects = formatProjects(projects, options);

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
