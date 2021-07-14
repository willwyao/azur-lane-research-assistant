import React from "react";
import availableProjects from "./availableProjects.json";

const ResearchProjects = ({ options, specialOptions }) => {
  let tiers = [];
  let currentTier = [];
  let currentValue = 0;

  // options.forEach((group) => {
  //   group.items.forEach((item) => {
  //     loadedOptions.push(item);
  //   });
  // });
  let loadedOptions = [];
  loadedOptions = options.flatMap((group) => group.items);

  let projects = availableProjects.map((project) => {
    let finalValue = 0;
    let projectValues = [];

    //load option values into each project
    project.projectParts.forEach((partId) => {
      let partValue = loadedOptions.find(
        (loadedOption) => loadedOption.id === partId
      ).value;
      projectValues.push(partValue);
    });

    //calculate project final value
    if (projectValues.indexOf(0) === -1) {
      finalValue = projectValues.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    } else {
      finalValue = 0;
    }

    return { id: project.id, name: project.projectName, value: finalValue };
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
      <p>当期为四期科研，往期为三期科研</p>
      <div className="projects-container ">
        {tiers.map((tier, index) => {
          return (
            <div className={`tier-${index} row mb-1`} key={index}>
              {tier.map((project, index) => {
                return (
                  <div className="project" key={index}>
                    <span>#{project.id}</span>
                    <span className="project-name">{project.name}:</span>
                    <span className="project-value">{project.value}</span>
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
