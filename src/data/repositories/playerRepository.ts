import Player, { PlayerCreationModel } from '../models/Player';
import baseRepository, { BaseRepository } from './baseRepository';

interface PlayerRepository extends BaseRepository<Player, PlayerCreationModel> {}

const playerRepository: PlayerRepository = baseRepository('players');

export default playerRepository;
