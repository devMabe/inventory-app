import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { TokenData } from 'src/auth/model/auth.model';
import { JWT_SECRET, JWT_SECRET_REFRESH } from '../config';

const generateToken = async (user: TokenData) => {
  const jwt = sign(user, JWT_SECRET, { expiresIn: '5m' });
  return jwt;
};

const generateRefreshToken = async (user: TokenData) => {
  const jwt = sign(user, JWT_SECRET_REFRESH, { expiresIn: '5m' });
  return jwt;
};

const verifyToken = async (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET);
  return isUser;
};

const verifyRefresh = async (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET_REFRESH);
  return isUser;
};

export { generateToken, generateRefreshToken, verifyToken, verifyRefresh };
