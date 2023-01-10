module.exports = (componentName, modelName) => ({
  content: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${modelName}Service } from './${componentName}.service';
import { ${modelName}Controller } from './${componentName}.controller';
import { ${modelName} } from './${componentName}.model';

@Module({
  imports: [TypeOrmModule.forFeature([${modelName}])],
  controllers: [${modelName}Controller],
  providers: [${modelName}Service],
})
export class ${modelName}Module {}
`,
  name: `${componentName}.module.ts`,
});
