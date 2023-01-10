/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserRole } from 'src/enums/UserRole';

export interface UpdateUserDto {
  fullName?: string;
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
}
