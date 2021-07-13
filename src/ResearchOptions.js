import React from "react";

const ResearchOptions = ({ options, setOptions }) => {
  const handleChange = (e) => {
    const optionId = parseInt(e.target.name);
    const optionValue = parseInt(e.target.value);

    const newOptions = options.map((group) => {
      const newItems = group.items.map((item) => {
        if (item.id === optionId) {
          return { ...item, value: optionValue };
        } else {
          return item;
        }
      });
      return { ...group, items: newItems };
    });
    setOptions(newOptions);
  };
  return (
    <div className="container">
      <h3>优先级设置</h3>
      <p>可用优先级：0（屏蔽），1，2，3，4，5，6，50，99</p>
      <form className="row justify-content-between">
        {options.map((group) => {
          const { id, group_name, items } = group;
          return (
            <div className="group col-6 col-md-4 col-lg-2 mb-3" key={id}>
              <h4>{group_name}</h4>
              <div className="option-container">
                {items.map((option) => {
                  const { id, title, value } = option;
                  return (
                    <div
                      className="option d-flex justify-content-between"
                      key={id}
                    >
                      <label htmlFor={id}>{title}</label>
                      <input
                        type="number"
                        name={id}
                        value={value}
                        onChange={handleChange}
                        className="option-value"
                      />
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
