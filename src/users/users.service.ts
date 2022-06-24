import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { UserEditDto } from './dto/user-edit.dto';
import e from 'express';
import { rootLogger } from 'ts-jest';
import { IUserEdit } from './userEdit.Interface';
import { fileDeleteStrategy } from './strategy/fileDelete.strategy';

@injectable()
export class UsersService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, firstName, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, firstName);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const candidate = await this.usersRepository.findUser(email);
		if (candidate) {
			return null;
		}
		return await this.usersRepository.createUser(newUser);
	}

	async editUser(
		{ firstName, lastName, gender, email }: UserEditDto,
		jwtEmail: string,
	): Promise<any> {
		if (jwtEmail) {
			const user = await this.usersRepository.findUser(jwtEmail);

			if (user) {
				const emailJwt = user.email;
				if (firstName) {
					await this.usersRepository.editFirstName(firstName, emailJwt);
				}
				if (lastName) {
					await this.usersRepository.editLastName(lastName, emailJwt);
				}
				if (email) {
					await this.usersRepository.editEmail(email, emailJwt);
				}
				if (gender) {
					await this.usersRepository.editGender(gender, emailJwt);
				}
				return await this.usersRepository.findUser(jwtEmail);
			}
		}
	}

	async editUserPhoto(nameFile: string, jwtEmail: string): Promise<void> {
		await this.fileDelete(jwtEmail);
		await this.usersRepository.editUserPhoto(nameFile, jwtEmail);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.usersRepository.findUser(email);
	}

	async getUserById(id?: number): Promise<any> {
		if (!id) {
			return await this.usersRepository.getAllUser();
		}

		return await this.usersRepository.getUserById(id);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const candidate = await this.usersRepository.findUser(email);
		if (!candidate) {
			return false;
		}
		const repUser = new User(candidate.email, candidate.firstName, candidate.password);
		return await repUser.comparePassword(password);
	}
	private async fileDelete(jwtEmail: string): Promise<void> {
		const userEdit = await this.usersRepository.findUser(jwtEmail);
		if (userEdit) {
			if (userEdit.photo !== 'NaN') {
				fileDeleteStrategy(userEdit.photo);
			}
		}
	}
}
