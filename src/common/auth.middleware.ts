import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret_jwt: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret_jwt, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					// @ts-ignore
					req.user = payload.email;
					next();
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
}
