import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(private readonly _email: string, private readonly _firstName: string, hash?: string) {
		if (hash) {
			this._password = hash;
		}
	}

	get email(): string {
		return this._email;
	}

	get firstName(): string {
		return this._firstName;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
