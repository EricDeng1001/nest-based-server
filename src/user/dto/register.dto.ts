import { Length, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class RegsiterDTO {
  @IsDefined()
  @Length(5, 12)
  readonly username: string;

  @IsDefined()
  @Length(8, 16)
  readonly password: string;

  @IsDefined()
  @Length(1, 32)
  readonly name: string;

  @IsDefined()
  @Length(1, 32)
  readonly company: string;

  @IsDefined()
  @Length(5, 16)
  readonly phone: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  readonly invite_code: string;

  @IsDefined()
  @IsNotEmpty()
  readonly success_url: string;

  @IsDefined()
  @IsNotEmpty()
  readonly error_url: string;

  @Length(5, 20)
  readonly wechat: string;
}
