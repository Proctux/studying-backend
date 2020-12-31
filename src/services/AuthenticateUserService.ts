import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect email/password combination');
        }

        const token = sign({}, 'e1ec71f49c0c0fd443a6aa64680669d0', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
