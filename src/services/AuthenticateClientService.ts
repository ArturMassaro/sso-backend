import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import Client from '../models/Client';

interface Request {
  email: string;
  password: string;
}

class AuthenticateClientService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ client: Client; token: string }> {
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne({
      where: {
        email,
      },
    });

    if (!client) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, client.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ uuid: client.uuid }, secret, {
      subject: client.uuid,
      expiresIn,
    });

    return {
      client,
      token,
    };
  }
}

export default AuthenticateClientService;
