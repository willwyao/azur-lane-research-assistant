// import "./App.css";
import { useState, useEffect } from "react";
import ResearchOptions from "./ResearchOptions";
import ResearchProjects from "./ResearchProjects";
import defaultOptions from "./defaultOptions.json";
import SpecialOptions from "./SpecialOptions";
import defaultOptionClasses from "./defaultOptionClasses.json";

const version = "1.5";

const getStoredOptions = () => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedOptions = localStorage.getItem("azur_options");
  if (storedVersion && storedOptions) {
    storedOptions = JSON.parse(localStorage.getItem("azur_options"));
    if (storedVersion === version) {
      return storedOptions;
    } else {
      localStorage.removeItem("azur_options");
      return defaultOptions;
    }
  } else {
    return defaultOptions;
  }
};

const getSpecialOptions = () => {
  let storedVersion = localStorage.getItem("azur_version");
  let storedSpOptions = localStorage.getItem("azur_sp_options");
  if (storedVersion && storedSpOptions) {
    storedSpOptions = JSON.parse(localStorage.getItem("azur_sp_options"));
    if (storedVersion === version) {
      return storedSpOptions;
    } else {
      localStorage.removeItem("azur_sp_options");
      return {
        priority: Array(6).fill("0"),
      };
    }
  } else {
    return { priority: Array(6).fill("0") };
  }
};

function App() {
  const [options, setOptions] = useState(getStoredOptions());
  const [specialOptions, setSpecialOptions] = useState(getSpecialOptions());
  const optionClasses = defaultOptionClasses;

  useEffect(() => {
    localStorage.setItem("azur_version", version);
    localStorage.setItem("azur_options", JSON.stringify(options));
    localStorage.setItem("azur_sp_options", JSON.stringify(specialOptions));
  }, [options, specialOptions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">
          碧蓝航线脚本科研助手 <small>v{version}</small>
        </h1>
      </header>
      <div className="container">
        <p>
          请根据自身的需要调整科研项目的优先级，调整完后把设置参数手动录入“雨点航线”。
          科研项目的选取可以参考碧蓝航线WIKI的
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

      <ResearchOptions
        options={options}
        optionClasses={optionClasses}
        setOptions={setOptions}
      />
      <SpecialOptions
        specialOptions={specialOptions}
        setSpecialOptions={setSpecialOptions}
      />
      <ResearchProjects options={options} specialOptions={specialOptions} />
    </div>
  );
}

export default App;
