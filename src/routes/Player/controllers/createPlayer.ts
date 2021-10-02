import { Response } from 'express';
import { PlayerCreationModel } from '../../../data/models/Player';
import RequestBody from '../../../data/models/RequestBody';
import httpResponse from '../../../helpers/httpResponse';
import createNewPlayer from '../actions/createNewPlayer';
import getPlayerByName from '../actions/getPlayerByName';
import validateCreatePlayer from '../actions/validateCreatePlayer';

async function createPlayer(req: RequestBody<PlayerCreationModel>, res: Response) {
  const { body } = req;
  const validationError = await validateCreatePlayer(body);
  if (validationError) {
    return res.status(httpResponse.badRequest).send(validationError);
  }
  await createNewPlayer(body, req.user.userId);
  const player = await getPlayerByName(body.name, req.user.userId);
  if (player === null) return res.status(httpResponse.notFound).send('Player not found');

  res.status(httpResponse.created).json({ player });
}

export default createPlayer;
