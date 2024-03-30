import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { TokenData } from 'src/auth/model/auth.model';

const JWT_SECRET = process.env.JWT_SECRET || 'sarasa';

const generateToken = async (user: TokenData) => {
  const jwt = sign(user, JWT_SECRET, { expiresIn: '1h' });
  return jwt;
};

const verifyToken = async (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET);
  return isUser;
};

export { generateToken, verifyToken };
