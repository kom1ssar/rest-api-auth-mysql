import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './userController.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign, verify } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './user.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { UserEditDto } from './dto/user-edit.dto';

import fileUpload from 'express-fileupload';
import { fileWriteStrategy } from './strategy/fileWrite.strategy';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/profiles/:id?',
				method: 'get',
				func: this.getUserById,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/edit',
				method: 'put',
				func: this.editUser,
				middlewares: [new AuthGuard(), new ValidateMiddleware(UserEditDto)],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const candidate = await this.userService.validateUser(body);
		if (!candidate) {
			return next(new HTTPError(401, 'Ошибка авторизации', 'login'));
		}

		const jwt = await this.signJwt(body.email, this.configService.get('SECRET_JWT'));
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	async editUser(
		{ body, headers, files }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (headers.authorization) {
			const jwtEmail = await this.decodeJwt(headers.authorization);

			if (jwtEmail) {
				if (files) {
					// @ts-ignore
					const { img }: fileUpload.UploadedFile = files;
					if (img) {
						const resultWrite = await fileWriteStrategy(img);
						if (!resultWrite) {
							return next(
								new HTTPError(401, 'Допустимые файлы: .png, .jpg, .gif, .jpeg', '/editUser'),
							);
						}
						await this.userService.editUserPhoto(resultWrite, jwtEmail);
					} else {
						return next(new HTTPError(401, 'Name: img', '/editUser'));
					}
				}

				if (body.gender) {
					if (body.gender.toLowerCase() !== 'female' && body.gender.toLowerCase() !== 'male') {
						return next(new HTTPError(401, 'Пол может содержать только: female,male', '/editUser'));
					}
				}
				const valid = await this.userService.editUser(body, jwtEmail);
				this.ok(res, { valid });
			} else {
				return next(new HTTPError(401, 'Ошибка авторизации', '/editUser'));
			}
		}
	}

	async getUserById({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const id = Number(params.id);
		const users = await this.userService.getUserById(id);
		this.ok(res, { users });
	}

	private signJwt(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,

					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256', expiresIn: '30m' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}

	private async decodeJwt(jwtToken: string): Promise<string | null> {
		try {
			const jwtBody = await verify(jwtToken.split(' ')[1], this.configService.get('SECRET_JWT'));
			// @ts-ignore
			return jwtBody.email;
		} catch (e) {
			new HTTPError(400, 'Некорректный токен', 'decodeJwt');
			return null;
		}
	}
}
