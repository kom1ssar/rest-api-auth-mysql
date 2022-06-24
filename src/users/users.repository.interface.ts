import { User } from './user.entity';
import { UserModel } from '@prisma/client';

export interface IUsersRepository {
	createUser: (user: User) => Promise<UserModel>;
	findUser: (email: string) => Promise<UserModel | null>;
	getUserById: (id: number) => Promise<any>;
	getAllUser: () => Promise<any>;
	editFirstName: (editStr: string, jwtEmail: string) => Promise<void>;
	editLastName: (editStr: string, jwtEmail: string) => Promise<void>;
	editGender: (editStr: string, jwtEmail: string) => Promise<void>;
	editEmail: (editStr: string, jwtEmail: string) => Promise<void>;
	editUserPhoto: (nameFile: string, jwtEmail: string) => Promise<UserModel>;
}
