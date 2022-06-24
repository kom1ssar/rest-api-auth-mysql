import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Некорректный email' })
	email: string;
	@IsString({ message: 'Не указан пароль' })
	@Length(5, 13, { message: 'Пароль должен содержать минимум 3 символа' })
	@Length(5, 11, { message: 'Пароль должен содержать от 5 до 11 символов' })
	password: string;
	@IsString({ message: 'Некорректное имя' })
	firstName: string;
}
