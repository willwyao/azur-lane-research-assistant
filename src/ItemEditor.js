import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";

const ItemEditor = () => {
  const {
    options,
    optionClasses,
    projects,
    itemEditor,
    loadOptionsFromClass,
    setProjects,
  } = useGlobalContext();

  const inputRef = useRef({});

  const saveProject = (e) => {
    e.preventDefault();
    console.log("submited");
    currentProject.projectName = inputRef.current["editor-project-name"].value;
    Object.keys(currentProject.attributes).forEach((key) => {
      if (key !== "cost") {
        currentProject.attributes[key] =
          inputRef.current[`editor-project-${key}`].value !== "0"
            ? inputRef.current[`editor-project-${key}`].value
            : null;
      } else {
        let newCosts = [];
        Object.keys(inputRef.current).forEach((key) => {
          if (key.includes("cost") && inputRef.current[key].checked) {
            newCosts.push(key.slice(-2));
          }
        });
        currentProject.attributes.cost = newCosts;
      }
    });

    // console.log("after");
    // console.log(currentProject);

    let newProjects = [];
    if (projects.find((project) => project.id === currentProject.id)) {
      newProjects = projects.map((project) => {
        if (project.id !== currentProject.id) {
          return project;
        } else {
          return currentProject;
        }
      });
    } else {
      newProjects = projects;
      newProjects.push(currentProject);
    }
    console.log("before re-set projects");
    setProjects(newProjects);
  };

  const inputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value.replace(
      /[^\u4e00-\u9fa5A-Za-z0-9_\.-]/g,
      ""
    );

    inputRef.current[inputName].value = inputValue;
  };

  let currentProject = projects.find((project) => project.id === itemEditor);

  if (currentProject === undefined) {
    currentProject = {
      id: new Date().getTime().toString(),
      projectName: "",
      attributes: {
        cost: ["12"],
        season: "0",
        type: "0",
        colour: "0",
        scale: "0",
        ship: "0",
        time: "",
      },
    };
  }

  useEffect(() => {
    inputRef.current["editor-project-name"].value = currentProject.projectName;
    Object.keys(currentProject.attributes).forEach((key) => {
      if (key !== "cost") {
        inputRef.current[`editor-project-${key}`].value =
          currentProject.attributes[key] === null
            ? "0"
            : currentProject.attributes[key];
      } else {
        options
          .filter((option) => option.optionClass === key)
          .forEach((cost_item) => {
            const { id } = cost_item;
            if (currentProject.attributes[key].includes(id)) {
              inputRef.current[`editor-project-${key}-${id}`].checked = true;
            } else {
              inputRef.current[`editor-project-${key}-${id}`].checked = false;
            }
          });
      }
    });
    // console.log("before");
    // console.log(currentProject);
  }, [currentProject, options]);

  return (
    <form onSubmit={saveProject}>
      <div className="editor-options">
        <div className="editor-option">
          <span className="option-name">项目名称</span>
          <input
            type="text"
            name="editor-project-name"
            ref={(el) => {
              inputRef.current["editor-project-name"] = el;
            }}
            onChange={inputChange}
          />
        </div>

        {Object.keys(currentProject.attributes).map((key) => {
          const optionClass = optionClasses.find((item) => item.id === key);

          if (optionClass) {
            const attritbureOptions = loadOptionsFromClass(
              optionClass,
              options
            );
            if (optionClass.mulltiValue === false) {
              return (
                <div className="editor-option" key={key}>
                  <span className="option-name">{optionClass.title}</span>
                  <select
                    name={`editor-projrct-${key}`}
                    ref={(el) => {
                      inputRef.current[`editor-project-${key}`] = el;
                    }}
                  >
                    <option value="0">不选</option>
                    {attritbureOptions.map((option) => {
                      const { id, title } = option;
                      return (
                        <option value={id} key={id}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            } else {
              /*cost attribute*/
              return (
                <div className="editor-option" key={key}>
                  <span className="option-name">{optionClass.title}</span>
                  <div className="project-cost-box">
                    {attritbureOptions.map((option) => {
                      const { id, title } = option;
                      return (
                        <div className="cost-item" key={id}>
                          <input
                            type="checkbox"
                            name={`editor-project-${key}-${id}`}
                            // checked={currentProject.attributes.cost.includes(
                            //   id
                            // )}
                            ref={(el) => {
                              inputRef.current[`editor-project-${key}-${id}`] =
                                el;
                            }}
                          />
                          <label htmlFor={`editor-project-${key}-${id}`}>
                            {title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          } else {
            /*time attribute*/
            return (
              <div className="editor-option" key={key}>
                <span className="option-name">项目时间</span>
                <input
                  type="text"
                  name={`editor-project-${key}`}
                  ref={(el) => {
                    inputRef.current[`editor-project-${key}`] = el;
                  }}
                  onChange={inputChange}
                />
              </div>
            );
          }
        })}
      </div>
      <button className="btn btn-primary">保存</button>
    </form>
  );
};

export default ItemEditor;
