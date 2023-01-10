module.exports = (componentName) => ({
  content: `export * from './create-${componentName}.dto';
export * from './update-${componentName}.dto';
export * from './get-${componentName}.dto';
`,
  name: `dto/index.ts`,
});
