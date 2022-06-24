import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { isJWT } from 'class-validator';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createUser({ email, firstName, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				firstName,
			},
		});
	}

	async editFirstName(editStr: string, jwtEmail: string): Promise<void> {
		await this.prismaService.client.userModel.update({
			where: {
				email: jwtEmail,
			},
			data: {
				firstName: editStr,
			},
		});
	}

	async editLastName(editStr: string, jwtEmail: string): Promise<void> {
		await this.prismaService.client.userModel.update({
			where: {
				email: jwtEmail,
			},
			data: {
				lastName: editStr,
			},
		});
	}

	async editEmail(editStr: string, jwtEmail: string): Promise<void> {
		await this.prismaService.client.userModel.update({
			where: {
				email: jwtEmail,
			},
			data: {
				email: editStr,
			},
		});
	}
	async editGender(editStr: string, jwtEmail: string): Promise<void> {
		await this.prismaService.client.userModel.update({
			where: {
				email: jwtEmail,
			},
			data: {
				gender: editStr,
			},
		});
	}

	async editUserPhoto(nameFile: string, jwtEmail: string): Promise<UserModel> {
		return await this.prismaService.client.userModel.update({
			where: {
				email: jwtEmail,
			},
			data: {
				photo: nameFile,
			},
		});
	}

	async findUser(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	async getAllUser(): Promise<any> {
		return await this.prismaService.client.userModel.findMany({
			orderBy: {
				createdOn: 'desc',
			},
		});
	}

	async getUserById(id: number): Promise<any> {
		return this.prismaService.client.userModel.findUnique({
			where: {
				id,
			},
		});
	}
}
