import React from "react";

const SpecialOptions = ({ specialOptions, setSpecialOptions }) => {
  let currentPriority = {};
  currentPriority = specialOptions.priority;

  const handleSpChange = (e) => {
    const spId = e.target.value.replace(/\D/g, "");
    const spIndex = e.target.getAttribute("index");
    currentPriority[spIndex] = spId;
    setSpecialOptions({
      priority: currentPriority,
    });
  };
  return (
    <div className="special-options container">
      <h3>特殊优先级设置</h3>
      <p>越下方位置优先级越高(编号为三位数字)</p>
      <form>
        {currentPriority.map((item, index, arr) => {
          return (
            <div className="sp-option" key={index}>
              <label htmlFor={`sp-${arr.length - index}`}>
                T{arr.length - index}: 项目编号
              </label>
              <input
                type="text"
                maxLength="3"
                name={`sp-${arr.length - index}`}
                index={index}
                value={item && item}
                onChange={handleSpChange}
                className="sp-value"
              />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default SpecialOptions;
