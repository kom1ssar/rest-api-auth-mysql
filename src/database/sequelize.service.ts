import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class SequelizeService {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
}
