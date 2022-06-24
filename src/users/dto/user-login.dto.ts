import { IS_LENGTH, IsEmail, IsString, Length } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Некорректный email' })
	email: string;
	@Length(0, 11, { message: 'Некорректная длина пароля' })
	@IsString({ message: 'Некорректный пароль' })
	password: string;
}
