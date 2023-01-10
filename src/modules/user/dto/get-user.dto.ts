/* eslint-disable @typescript-eslint/no-empty-interface */
import { PagingDto } from 'src/dto/paging.dto';
import { UserRole } from 'src/enums/UserRole';

export interface GetUserFilterDto {
  role?: UserRole;
}

export type GetUserDto = {
  filter?: GetUserFilterDto;
  paging?: PagingDto;
};
