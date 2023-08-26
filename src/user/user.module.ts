import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from '../constant/jwt-constant';
import { AuthGuard } from './Auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, AuthGuard],
})
export class UserModule {}
