import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { AuthenticateUserController } from '@controllers/AuthenticateUserController';
import { CreateMessageController } from '@controllers/CreateMessageController';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

router.post(
  '/messages',
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get('/github', (request: Request, response: Response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get('/singin/callback', (request: Request, response: Response) => {
  const { code } = request.query;

  return response.json(code);
});

export { router };
