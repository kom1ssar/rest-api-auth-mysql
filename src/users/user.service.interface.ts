import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';
import { UserEditDto } from './dto/user-edit.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
	getUserById: (id?: number) => Promise<any>;
	editUser: (dto: UserEditDto, jwtEmail: string) => Promise<UserModel | null>;
	editUserPhoto: (nameFile: string, jwtEmail: string) => Promise<void>;
}
