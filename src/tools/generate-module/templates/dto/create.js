module.exports = (componentName, modelName) => ({
  content: `/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Create${modelName}Dto {}
`,
  name: `dto/create-${componentName}.dto.ts`,
});
