interface TokenUser {
  userId: number;
  email: string;
}

namespace Express {
  export interface Request {
    user: TokenUser;
  }
}
