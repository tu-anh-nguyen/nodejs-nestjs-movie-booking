/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const fs = require('fs');
const _ = require('colors');
const templates = require('./templates');

const params = process.argv.slice(2);

if (!params?.length) {
  console.error('Please supply a valid component name'.red);
  process.exit(1);
}

params.forEach((param) => {
  const modelName = param
    .split('_')
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join('');
  const componentName = param[0] + modelName.slice(1);

  console.log(`Creating Component Templates with name: ${componentName}`);

  const componentDirectory = `./src/modules/${componentName}`;

  if (fs.existsSync(componentDirectory)) {
    console.error(`Component ${componentName} already exists.`.red);
    process.exit(1);
  }

  fs.mkdirSync(componentDirectory);
  fs.mkdirSync(`${componentDirectory}/dto`);

  templates.forEach((template) => {
    const { content, name } = template(componentName, modelName);
    fs.writeFileSync(`${componentDirectory}/${name}`, content);
    console.log('CREATED'.green, `${componentDirectory}/${name}`);
  });

  // update app module
  const appModuleDirectory = './src/app.module.ts';
  const appModule = fs.readFileSync(appModuleDirectory).toString();
  const importModuleIdx = appModule.indexOf(
    `import { AppController } from './app.controller';`,
  );
  const addEntitiesIdx = appModule.indexOf(`],
  }),
  inject: [ConfigService],`);
  const importDecoratorIdx = appModule.indexOf('AppDataSource,');
  const importModuleContent = `import { ${modelName} } from './modules/${modelName}/${componentName}.model';
import { ${modelName}Module } from './modules/${modelName}/${componentName}.module';\n`;
  const addEntitiesContent = `, ${modelName}`;
  const importDecoratorContent = `${modelName}Module,\n    `;
  const newAppModule =
    appModule.slice(0, importModuleIdx) +
    importModuleContent +
    appModule.slice(importModuleIdx, addEntitiesIdx) +
    addEntitiesContent +
    appModule.slice(addEntitiesIdx, importDecoratorIdx) +
    importDecoratorContent +
    appModule.slice(importDecoratorIdx);
  console.log('UPDATED'.blue, appModuleDirectory.gray);
  fs.writeFileSync(appModuleDirectory, newAppModule);
});
