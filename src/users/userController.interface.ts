import { NextFunction, Request, Response } from 'express';
import { UserModel } from '@prisma/client';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	info: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getUserById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	editUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
