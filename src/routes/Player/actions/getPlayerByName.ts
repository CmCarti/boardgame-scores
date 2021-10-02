import Player from '../../../data/models/Player';
import playerRepository from '../../../data/repositories/playerRepository';

export default async function getPlayerByName(
  name: string,
  userId: number
): Promise<Player | null> {
  const rows = await playerRepository.find(
    `name = '${name}' And (userid = ${userId} or creatorId = ${userId})`
  );
  if (!rows.length) return null;
  return rows[0];
}
