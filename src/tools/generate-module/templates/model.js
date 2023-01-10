module.exports = (componentName, modelName) => ({
  content: `import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: '${componentName}s',
})
export class ${modelName} {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
`,
  name: `${componentName}.model.ts`,
});
