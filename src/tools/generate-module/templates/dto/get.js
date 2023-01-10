module.exports = (componentName, modelName) => ({
  content: `/* eslint-disable @typescript-eslint/no-empty-interface */
import { PagingDto } from 'src/dto/paging.dto';

export interface Get${modelName}FilterDto {}

export type Get${modelName}Dto = {
  filter?: Get${modelName}FilterDto;
  paging?: PagingDto;
};
`,
  name: `dto/get-${componentName}.dto.ts`,
});
