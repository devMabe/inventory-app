import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/create.dto';
import { encrypt } from '../util/bcryptjs';
import { UpdateDto } from '../dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(filters?: { active?: boolean }): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        ...(filters?.active !== undefined
          ? {
              isActive: filters.active,
            }
          : null),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async get(id: number): Promise<User | null> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async create(createDto: CreateDto): Promise<User> {
    const user = this.userRepository.create(createDto);

    const emailExists = await this.getByEmail(user.email);
    if (emailExists) throw new BadRequestException('The email already exists');

    const docNumber = await this.getByDocNumber(user.docNumber);
    if (docNumber)
      throw new BadRequestException('The docNumber already exists');

    user.password = await encrypt(createDto.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return await this.userRepository.save(user);
  }

  async update(id: number, updateUser: UpdateDto): Promise<User> {
    const found = await this.get(id);
    if (found) {
      const userUpdated = this.userRepository.create(updateUser);

      userUpdated.updatedAt = new Date();
      await this.userRepository.update(id, userUpdated);
      return await this.get(id);
    }
  }

  async active(id: number): Promise<User | null> {
    const found = await this.get(id);

    if (found) {
      found.isActive = true;
      found.retry = 0;
      return await this.update(id, found);
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  async getByDocNumber(docNumber: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      docNumber,
    });
  }
}
