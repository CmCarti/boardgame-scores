import { PlayerCreationModel } from '../../../data/models/Player';
import playerRepository from '../../../data/repositories/playerRepository';

export default async function validateCreatePlayer(body: PlayerCreationModel): Promise<string> {
  if (!body) {
    return 'Request is not valid';
  }
  if (!body.name) {
    return 'Username (name) is required';
  }

  const checkForExisting = await playerRepository.find(`name = '${body.name}'`);

  if (checkForExisting && checkForExisting.length) {
    return 'Username is taken';
  }

  return '';
}
