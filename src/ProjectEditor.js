import React from "react";
import { useGlobalContext } from "./context";

const ProjectEditor = () => {
  const {
    options,
    projects,
    generateProjectLabel,
    formatProjects,
    deleteProject,
  } = useGlobalContext();

  let outPutProjects = formatProjects(projects, options);

  return (
    <div className="container projects-container ">
      {outPutProjects.map((project) => {
        return (
          <div className="row editor-unit mb-1" key={project.id}>
            <div className="project col-sm-6 col-lg-4">
              <div className={`project-inner bg-${project.colour}`}>
                <span className="project-name">{project.name}</span>
              </div>
            </div>

            <div className="editor-buttons col-sm-6 col-lg-8">
              <button className="btn btn-primary">编辑</button>
              <button
                className="btn btn-danger"
                onClick={() => deleteProject(project.id)}
              >
                删除
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectEditor;
