module.exports = (componentName, modelName) => ({
  content: `import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ${modelName}Service } from './${componentName}.service';
import { Create${modelName}Dto, Update${modelName}Dto, Get${modelName}Dto } from './dto/';

@Controller('${componentName}')
export class ${modelName}Controller {
  constructor(private readonly ${componentName}Service: ${modelName}Service) {}

  @Post()
  create(@Body() create${modelName}Dto: Create${modelName}Dto) {
    return this.${componentName}Service.create(create${modelName}Dto);
  }

  @Get()
  find(@Body() { paging, filter }: Get${modelName}Dto) {
    return this.${componentName}Service.find({ paging, filter });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${componentName}Service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update${modelName}Dto: Update${modelName}Dto) {
    return this.${componentName}Service.update(id, update${modelName}Dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.${componentName}Service.remove(id);
  }
}
`,
  name: `${componentName}.controller.ts`,
});
