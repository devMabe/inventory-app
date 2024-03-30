import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { Token } from '../model/auth.model';
import { AuthDto } from '../dto/auth.dto';
import { verified } from 'src/user/util/bcryptjs';
import { generateToken, verifyToken } from '../util/jwt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(params: AuthDto): Promise<Token> {
    const { username, password } = params;

    const user = await this.userService.getByEmail(username);

    if (!user.isActive)
      throw new UnauthorizedException(
        'The user has be bloked. Contact the administrador',
      );

    if (user.retry >= 3) {
      user.isActive = false;
      await this.userService.update(user.id, user);
    }

    if (!user) throw new NotFoundException('Email not found');

    const valid = await verified(password, user.password);

    if (valid) {
      const token = await generateToken({ email: username });
      return {
        token,
        data: {
          id: user.id,
          docNumber: user.docNumber,
          doctType: user.docType,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: user.isActive,
        },
      };
    } else {
      user.retry += 1;
      await this.userService.update(user.id, user);
      throw new UnauthorizedException('The email or password is incorrect');
    }
  }

  async refreshToken(token: string): Promise<{ refreshToken: string }> {
    try {
      const valid = await verifyToken(token);
      if (valid) {
        const user = await this.userService.getByEmail(valid['email']);

        const newToken = await generateToken({
          email: user.email,
        });

        user.refreshToken = newToken;
        await this.userService.update(user.id, user);

        return {
          refreshToken: newToken,
        };
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(error.message);
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
