module.exports = (componentName, modelName) => ({
  content: `import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Create${modelName}Dto, Get${modelName}Dto, Update${modelName}Dto } from './dto';
import { ${modelName} } from './${componentName}.model';
import { Pagination } from 'src/enums/Pagination';

@Injectable()
export class ${modelName}Service {
  constructor(
    @InjectRepository(${modelName})
    private ${componentName}Repository: Repository<${modelName}>,
  ) {}

  async create(create${modelName}Dto: Create${modelName}Dto) {
    try {
      return await this.${componentName}Repository.save(create${modelName}Dto);
    } catch (error) {
      throw error;
    }
  }

  async find({ paging = {}, filter = {} }: Get${modelName}Dto) {
    try {
      const { limit = Pagination.LIMIT, offset = Pagination.OFFSET } = paging;

      // config filter here
      const where: FindOptionsWhere<${modelName}> = {};

      const total = await this.${componentName}Repository.count();
      const ${componentName}s = await this.${componentName}Repository.find({
        where,
        take: limit + 1,
        skip: offset,
      });

      let nextPaging = null;
      if (${componentName}s.length > limit) {
        nextPaging = {
          limit,
          offset: offset + limit,
        };
        ${componentName}s.pop();
      }
      return {
        ${componentName}s,
        total,
        nextPaging,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const ${componentName} = await this.${componentName}Repository.findOne({ where: { id } });
      return ${componentName};
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, update${modelName}Dto: Update${modelName}Dto) {
    try {
      const ${componentName} = await this.${componentName}Repository.findOne({ where: { id } });
      if (!${componentName}) {
        throw new NotFoundException('${modelName} Not Found');
      }
      await this.${componentName}Repository.update(id, update${modelName}Dto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const ${componentName} = await this.${componentName}Repository.findOne({ where: { id } });
      if (!${componentName}) {
        throw new NotFoundException('${modelName} Not Found');
      }
      await this.${componentName}Repository.delete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
`,
  name: `${componentName}.service.ts`,
});
