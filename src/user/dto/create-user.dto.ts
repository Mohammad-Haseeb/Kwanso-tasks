import {
  IsEmail,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  Matches,
  IsEmpty,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(14)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must include capital lower and at least one number',
  })
  password: string;
}
