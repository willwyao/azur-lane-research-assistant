import React from "react";
import availableProjects from "./availableProjects";

let tiers = [];
let currentTier = [];
let currentValue = 0;
const ResearchProjects = ({ options }) => {
  let projects = availableProjects.map((project) => {
    let finalValue = 0;
    let loadedOptions = [];
    let projectValues = [];

    // options.forEach((group) => {
    //   group.items.forEach((item) => {
    //     loadedOptions.push(item);
    //   });
    // });
    loadedOptions = options.flatMap((group) => group.items);

    project.projectParts.forEach((partId) => {
      const selectedOption = loadedOptions.filter(
        (option) => option.id === partId
      );

      let newValue = selectedOption[0].value;
      projectValues.push(newValue);
    });

    if (projectValues.indexOf(0) === -1) {
      finalValue = projectValues.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    } else {
      finalValue = 0;
    }

    return { name: project.projectName, value: finalValue };
  });

  //sort projects' list as DESC
  projects.sort((a, b) => b.value - a.value);

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

  console.log(tiers);
  console.log(tiers.length);
  return (
    <div className="container">
      <h3>优先级计算结果</h3>
      <p>当期为四期科研，往期为三期科研</p>
      <div className="projects-container ">
        {tiers.map((tier, index) => {
          console.log(index);
          return (
            <div className={`tier-${index} row mb-3`} key={index}>
              {tier.map((project, index) => {
                return (
                  <div className="project" key={index}>
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
