const availableProjects = [
  {
    projectName: "当期彩色彩船定向（0.5H）",
    projectParts: [11, 12, 24, 31, 44, 53, 62],
  },
  {
    projectName: "当期金色彩船定向（8H）",
    projectParts: [12, 24, 31, 41, 51, 62],
  },
  {
    projectName: "当期紫色彩船定向（5H）",
    projectParts: [12, 24, 31, 42, 52, 62],
  },
  {
    projectName: "当期蓝色彩船定向（2.5H）",
    projectParts: [12, 24, 31, 43, 53, 62],
  },
  {
    projectName: "当期金色金船定向（0.5H）",
    projectParts: [11, 12, 24, 31, 41, 53, 61],
  },
  {
    projectName: "当期金色金船定向（8H）",
    projectParts: [12, 24, 31, 41, 51, 61],
  },
  {
    projectName: "当期紫色金船定向（5H）",
    projectParts: [12, 24, 31, 42, 52, 61],
  },
  {
    projectName: "当期蓝色金船定向（2.5H）",
    projectParts: [12, 24, 31, 43, 53, 61],
  },
  {
    projectName: "当期金色舰装解析（0.5H）",
    projectParts: [12, 15, 24, 37, 41, 53],
  },
  {
    projectName: "当期紫色舰装解析（4H）",
    projectParts: [15, 24, 37, 42, 52],
  },
  {
    projectName: "当期蓝色舰装解析（2H）",
    projectParts: [15, 24, 37, 43, 53],
  },
  {
    projectName: "当期蓝色舰装解析（1H）",
    projectParts: [15, 24, 37, 43, 53],
  },
  {
    projectName: "当期金色数据收集",
    projectParts: [16, 24, 35, 41, 52],
  },
  {
    projectName: "当期紫色资金募集（4H）",
    projectParts: [12, 24, 33, 42, 52],
  },
  {
    projectName: "当期蓝色资金募集（2.5H）",
    projectParts: [12, 24, 33, 43, 53],
  },
  {
    projectName: "当期蓝色资金募集（1.5H）",
    projectParts: [12, 24, 33, 43, 53],
  },
  {
    projectName: "当期紫色试验募集（2H）",
    projectParts: [16, 24, 34, 42, 53],
  },
  {
    projectName: "当期蓝色试验募集（2H）",
    projectParts: [16, 24, 34, 43, 53],
  },
  {
    projectName: "当期金色心智补全（0.5H）",
    projectParts: [11, 12, 24, 41, 53],
  },
  {
    projectName: "当期金色魔方解析（4H）",
    projectParts: [11, 24, 36, 41, 52],
  },
  {
    projectName: "当期紫色魔方解析（2H）",
    projectParts: [11, 24, 36, 42, 53],
  },
  {
    projectName: "当期蓝色魔方解析（1H）",
    projectParts: [11, 24, 36, 43, 53],
  },
  {
    projectName: "当期金色基础研究（12H）",
    projectParts: [13, 24, 32, 41, 51],
  },
  {
    projectName: "当期紫色基础研究（8H）",
    projectParts: [13, 24, 32, 42, 51],
  },
  {
    projectName: "当期蓝色基础研究（6H）",
    projectParts: [13, 24, 32, 43, 52],
  },

  {
    projectName: "往期彩色彩船定向（0.5H）",
    projectParts: [11, 12, 23, 31, 44, 53, 64],
  },
  {
    projectName: "往期金色彩船定向（8H）",
    projectParts: [12, 23, 31, 41, 51, 64],
  },
  {
    projectName: "往期紫色彩船定向（5H）",
    projectParts: [12, 23, 31, 42, 52, 64],
  },
  {
    projectName: "往期蓝色彩船定向（2.5H）",
    projectParts: [12, 23, 31, 43, 53, 64],
  },
  {
    projectName: "往期金色金船定向（0.5H）",
    projectParts: [11, 12, 23, 31, 41, 53, 63],
  },
  {
    projectName: "往期金色金船定向（8H）",
    projectParts: [12, 23, 31, 41, 51, 63],
  },
  {
    projectName: "往期紫色金船定向（5H）",
    projectParts: [12, 23, 31, 42, 52, 63],
  },
  {
    projectName: "往期蓝色金船定向（2.5H）",
    projectParts: [12, 23, 31, 43, 53, 63],
  },
  {
    projectName: "往期金色舰装解析（0.5H）",
    projectParts: [12, 15, 23, 37, 41, 53],
  },
  {
    projectName: "往期紫色舰装解析（4H）",
    projectParts: [15, 23, 37, 42, 52],
  },
  {
    projectName: "往期蓝色舰装解析（2H）",
    projectParts: [15, 23, 37, 43, 53],
  },
  {
    projectName: "往期蓝色舰装解析（1H）",
    projectParts: [15, 23, 37, 43, 53],
  },
  {
    projectName: "往期金色数据收集",
    projectParts: [16, 23, 35, 41, 52],
  },
  {
    projectName: "往期紫色资金募集（4H）",
    projectParts: [12, 23, 33, 42, 52],
  },
  {
    projectName: "往期蓝色资金募集（2.5H）",
    projectParts: [12, 23, 33, 43, 53],
  },
  {
    projectName: "往期蓝色资金募集（1.5H）",
    projectParts: [12, 23, 33, 43, 53],
  },
  {
    projectName: "往期紫色试验募集（2H）",
    projectParts: [16, 23, 34, 42, 53],
  },
  {
    projectName: "往期蓝色试验募集（2H）",
    projectParts: [16, 23, 34, 43, 53],
  },
  {
    projectName: "往期金色心智补全（0.5H）",
    projectParts: [11, 12, 23, 41, 53],
  },
  {
    projectName: "往期金色魔方解析（4H）",
    projectParts: [11, 23, 36, 41, 52],
  },
  {
    projectName: "往期紫色魔方解析（2H）",
    projectParts: [11, 23, 36, 42, 53],
  },
  {
    projectName: "往期蓝色魔方解析（1H）",
    projectParts: [11, 23, 36, 43, 53],
  },
  {
    projectName: "往期金色基础研究（12H）",
    projectParts: [13, 23, 32, 41, 51],
  },
  {
    projectName: "往期紫色基础研究（8H）",
    projectParts: [13, 23, 32, 42, 51],
  },
  {
    projectName: "往期蓝色基础研究（6H）",
    projectParts: [13, 23, 32, 43, 52],
  },
];
export default availableProjects;
