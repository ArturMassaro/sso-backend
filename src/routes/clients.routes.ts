import { Router } from 'express';

import CreateClientService from '../services/CreateClientService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routes = Router();

routes.post('/', async (request, response) => {
  console.log(request.body);
  const { name, email, password } = request.body;

  const createClient = new CreateClientService();

  const client = await createClient.execute({
    name,
    email,
    password,
  });

  delete client.password;

  return response.json(client);
  // return response.json({ client: true });
});

routes.use(ensureAuthenticated);

routes.get('/', async (request, response) => {
  return response.json({ auth: 'okay' });
});

export default routes;
