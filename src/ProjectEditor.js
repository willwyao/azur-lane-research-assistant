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
      <p>
        小程序已预置了科研三期和四期的主要科研项目，请参考碧蓝航线WIKI来设置科研项目
      </p>
      <div className="row mb-1">
        <div className="col text-center">
          <button
            onClick={() => resetProjects()}
            className="editor-switcher btn btn-primary"
          >
            重置科研项目
          </button>
          <p>清除自定义项目并恢复默认科研项目</p>
        </div>
        <div className="col text-center">
          <button
            onClick={() => toggleEditor("new")}
            className="editor-switcher btn btn-primary"
          >
            添加科研项目
          </button>
          <p>添加自定义科研项目</p>
        </div>
      </div>
      {itemEditor === "new" && (
        <div className="row mb-1">
          <div className="col">
            <ItemEditor />
          </div>
        </div>
      )}

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
