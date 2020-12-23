import { Router } from 'express';

import AuthenticateClientService from '../services/AuthenticateClientService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateClient = new AuthenticateClientService();

  const { client, token } = await authenticateClient.execute({
    email,
    password,
  });

  return response.json({ client, token });
  // return response.json({ client: true });
});

export default routes;
