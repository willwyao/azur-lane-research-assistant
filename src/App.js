import React from "react";
import ResearchOptions from "./ResearchOptions";
import ResearchProjects from "./ResearchProjects";
import SpecialOptions from "./SpecialOptions";
import ProjectEditor from "./ProjectEditor";
import { useGlobalContext } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

function App() {
  const { version, resetProjects, enableEditor, setEnableEditor } =
    useGlobalContext();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">
          碧蓝航线脚本科研助手 <small>v{version}</small>
        </h1>
      </header>
      <div className="container">
        <p>
          本程序基于“雨点航线”开发，用于计算科研项目在脚本内的优先级。首先调整优先级的数值，然后查看页面下方的优先级计算结果。反复调整各个优先级的设置直到出现自己想要的科研排名结果，然后将设置手动录入到“雨点航线”中。
          <strong>计算结果仅供参考，以实际脚本运行结果为准。</strong>
          请根据自身的需要调整科研项目的优先级，科研项目的选取可以参考碧蓝航线WIKI的
          <a
            href="https://wiki.biligame.com/blhx/%E7%A7%91%E7%A0%94%E9%A1%B9%E7%9B%AE%E9%80%89%E5%8F%96%E8%A7%84%E5%88%92%E5%BB%BA%E8%AE%AE"
            target="_blank"
            rel="noreferrer"
          >
            这篇攻略
          </a>
        </p>
        <p>
          注意事项：为了防止程序出错，小程序每次版本升级后会清空储存在浏览器中优先级设置,请重新设置。如果出现运行错误，请手动清空浏览器当前网址的本地存储
        </p>
      </div>

      <ResearchOptions />
      <SpecialOptions />
      <div className="section editor-section">
        <div className="section-header container">
          <h3>科研项目编辑器</h3>
          <button
            onClick={() => setEnableEditor(!enableEditor)}
            className="editor-switcher btn btn-primary"
          >
            {enableEditor ? "关闭" : "打开"}编辑器
          </button>
        </div>

        {enableEditor && <ProjectEditor />}
      </div>

      <ResearchProjects />
      <a href="#options" className="go-top">
        <FontAwesomeIcon icon={faArrowCircleUp} className="go-top-icon" />
      </a>
    </div>
  );
}

export default App;
