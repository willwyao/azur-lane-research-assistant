import React from "react";
import { useGlobalContext } from "./context";

const SpecialOptions = () => {
  const {
    specialOptions,
    optionClasses,
    setSpecialOptions,
    loadOptionsFromClass,
    options,
  } = useGlobalContext();

  const updateSpOption = (e) => {
    const opttionName = e.target.name;
    const optionValue = e.target.value;
    const spTier = parseInt(e.target.getAttribute("tier"));

    let newSpecialOptions = specialOptions.map((specialOption) => {
      if (specialOption.tier === spTier) {
        const newConditions = specialOption.conditions.map((condition) => {
          if (condition.name === opttionName) {
            return { ...condition, value: optionValue };
          } else {
            return condition;
          }
        });

        return { ...specialOption, conditions: newConditions };
      } else {
        return specialOption;
      }
    });
    setSpecialOptions(newSpecialOptions);
  };

  const toggleSpOption = (e) => {
    const toggleValue = e.target.checked;
    const spTier = parseInt(e.target.getAttribute("tier"));

    let newSpecialOptions = specialOptions.map((specialOption) => {
      if (specialOption.tier === spTier) {
        return { ...specialOption, enabled: toggleValue };
      } else {
        return specialOption;
      }
    });
    setSpecialOptions(newSpecialOptions);
  };

  return (
    <div className="special-options container">
      <h3>特殊优先级设置</h3>
      <p>越下方位置优先级越高</p>
      <form>
        {specialOptions.map((item) => {
          const { enabled, tier, conditions } = item;
          return (
            <div className="sp-option mb-2" key={tier}>
              <input
                type="checkbox"
                checked={enabled}
                name={`t-${tier}`}
                tier={tier}
                onClick={toggleSpOption}
                className="mr-2"
                readOnly
              />
              <label className="mr-2" htmlFor={`t-${tier}`}>
                T{tier}
              </label>
              {conditions.map((condition, index) => {
                const optionClass = optionClasses.find(
                  (item) => item.id === condition.name
                );
                let conditionOptions = loadOptionsFromClass(
                  optionClass,
                  options
                );
                return (
                  <div className="sp-option-box" key={index}>
                    <span className="sp-option-title">
                      {optionClass.title.slice(2)}
                    </span>
                    <select
                      name={condition.name}
                      value={condition.value}
                      tier={tier}
                      onChange={updateSpOption}
                    >
                      <option value="0">不选</option>
                      {conditionOptions.map((option) => {
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
              })}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default SpecialOptions;
