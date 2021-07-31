import React from "react";
import { useGlobalContext } from "./context";
import ItemEditor from "./ItemEditor";

const ProjectEditor = () => {
  const {
    options,
    projects,
    itemEditor,
    formatProjects,
    deleteProject,
    setItemEditor,
    resetProjects,
  } = useGlobalContext();

  let outPutProjects = formatProjects(projects, options);

  const toggleEditor = (id) => {
    if (id === itemEditor) {
      setItemEditor("0");
    } else {
      setItemEditor(id);
    }
  };

  return (
    <div className="container projects-container ">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <button
            onClick={() => resetProjects()}
            className="editor-switcher btn btn-primary"
          >
            重置科研项目
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => toggleEditor("new")}
            className="editor-switcher btn btn-primary"
          >
            添加科研项目
          </button>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">{itemEditor === "new" && <ItemEditor />}</div>
      </div>
      {outPutProjects.map((project) => {
        return (
          <div className="row editor-unit mb-1" key={project.id}>
            <div className="project col-sm-6 col-lg-4">
              <div className={`project-inner bg-${project.colour}`}>
                <span className="project-name">{project.name}</span>
              </div>
            </div>

            <div className="editor-buttons col-sm-6 col-lg-8">
              <button
                className="btn btn-primary"
                onClick={() => toggleEditor(project.id)}
              >
                {itemEditor === project.id ? "收起" : "编辑"}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteProject(project.id)}
              >
                删除
              </button>
            </div>
            <div className="col">
              {itemEditor === project.id && <ItemEditor />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectEditor;
