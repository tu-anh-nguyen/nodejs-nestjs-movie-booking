module.exports = (componentName, modelName) => ({
  content: `/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Update${modelName}Dto {
  id: string;
}
`,
  name: `dto/update-${componentName}.dto.ts`,
});
