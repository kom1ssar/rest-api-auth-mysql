import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] подключена база данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] Ошибка подключена к бд: ${e.message}`);
			}
		}
	}
	async disconnect(): Promise<void> {
		try {
			await this.client.$disconnect();
			this.logger.log('[PrismaService] отключена база данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[PrismaService] Ошибка отключения от бд: ${e.message}`);
			}
		}
	}
}
