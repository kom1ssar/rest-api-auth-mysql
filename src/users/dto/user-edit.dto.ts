import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserEditDto {
	@IsOptional()
	@IsString({ message: 'Некорректное имя' })
	firstName: string;
	@IsOptional()
	@IsString({ message: 'Некорректная фамилия' })
	lastName: string;
	@IsOptional()
	@IsString({ message: 'Некорректный пол' })
	gender: string;
	@IsOptional()
	@IsEmail({ message: 'Некорректный email' })
	email: string;
}
