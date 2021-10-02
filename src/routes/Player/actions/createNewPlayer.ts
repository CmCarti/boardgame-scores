import Player, { PlayerCreationModel } from '../../../data/models/Player';
import playerRepository from '../../../data/repositories/playerRepository';

export default async function createNewPlayer(
  player: PlayerCreationModel,
  creatorId: number
): Promise<void> {
  player.creatorId = creatorId;
  await playerRepository.add(player);
}
