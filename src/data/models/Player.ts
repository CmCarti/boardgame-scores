export default interface Player {
  name: string;
  creatorId: number;
  userId?: number;
  id: number;
}

export interface PlayerCreationModel {
  name: string;
  creatorId?: number;
  userId?: number;
}
