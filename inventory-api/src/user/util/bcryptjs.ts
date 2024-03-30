import { hash, compare } from 'bcryptjs';

const encrypt = async (pass: string) => {
  return await hash(pass, 10);
};

const verified = async (pass: string, passHash: string) => {
  return await compare(pass, passHash);
};

export { encrypt, verified };
