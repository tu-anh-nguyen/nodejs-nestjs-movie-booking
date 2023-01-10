import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto';
import { User } from './user.model';
import { Pagination } from 'src/enums/Pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (user) {
        throw new BadRequestException('email already existed');
      }

      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async find({ paging = {}, filter = {} }: GetUserDto) {
    try {
      const { limit = Pagination.LIMIT, offset = Pagination.OFFSET } = paging;
      const { role } = filter;

      const where: FindOptionsWhere<User> = {};
      if (role) {
        where.role = role;
      }

      const total = await this.userRepository.count();
      const users = await this.userRepository.find({
        where,
        take: limit + 1,
        skip: offset,
      });

      let nextPaging = null;
      if (users.length > limit) {
        nextPaging = {
          limit,
          offset: offset + limit,
        };
        users.pop();
      }
      return {
        users,
        total,
        nextPaging,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
