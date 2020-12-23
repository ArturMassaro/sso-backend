import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Client from '../models/Client';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateClientService {
  public async execute({ name, email, password }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const checkClientExists = await clientsRepository.findOne({
      where: { email },
    });

    if (checkClientExists) {
      throw new AppError('Email address already used.', 401);
    }

    const hashedPassword = await hash(password, 8);
    const client = clientsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;
