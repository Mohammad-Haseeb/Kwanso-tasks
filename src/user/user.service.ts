import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponse } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/auth-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const alreadyExists = await this.findOneByEmail(createUserDto.email);
      if (alreadyExists) {
        throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
      }

      const newUser = await this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(newUser);

      const responseUser: UserResponse = {
        user: {
          id: user.id,
          email: user.email,
        },
      };

      return responseUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async login(createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const user = await this.findOneByEmail(createUserDto.email);
      if (!user) {
        throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
      }

      const passwordComparison = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );
      if (!passwordComparison) {
        throw new UnauthorizedException();
      }

      const payload = { email: user.email, id: user.id };
      return {
        jwt: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: ['email', 'id'],
      });
      if (!user) {
        throw new HttpException(
          'No user found with this id',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        user: {
          ...user,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    email = email.toLocaleLowerCase();
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
