import React from "react";

const ResearchOptions = ({ options, optionClasses, setOptions }) => {
  const optionValueList = [0, 1, 2, 3, 4, 5, 6, 50, 99];

  const handleChange = (e) => {
    const optionId = e.target.name;
    const optionValue = parseInt(e.target.value.replace(/\D/g, ""));

    const newOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, value: optionValue };
      } else {
        return option;
      }
    });

    setOptions(newOptions);
  };

  return (
    <div className="container">
      <h3>优先级设置</h3>
      <form className="row justify-content-between">
        {optionClasses.map((optionClass) => {
          const { id, title, optionIds } = optionClass;
          return (
            <div className="option-class col-6 col-md-4 col-lg-2 mb-3" key={id}>
              <h4>{title}</h4>
              <div className="option-container">
                {options
                  .filter((option) => optionIds.indexOf(option.id) !== -1)
                  .map((option) => {
                    const { id, title, value, optionClass } = option;
                    return (
                      <div
                        className={`option-${optionClass} option d-flex justify-content-between`}
                        key={id}
                      >
                        <label htmlFor={id}>{title}</label>
                        <select
                          name={id}
                          onChange={handleChange}
                          className="option-value"
                          value={value}
                        >
                          {optionValueList.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item === 0 ? "屏蔽" : item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default ResearchOptions;
