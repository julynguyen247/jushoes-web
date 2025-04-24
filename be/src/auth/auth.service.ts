import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //user and pass are variables of the passport
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, fullName, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      fullName,
      email,
      role,
    };
    const refresh_token = this.createRefreshToken(payload);
    //update user with refresh token

    await this.usersService.updateUserToken(refresh_token, _id);

    //set refresh token as cookies
    response.clearCookie('refresh_token');
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        fullName,
        email,
        role,
      },
    };
  }
  createRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
    return refresh_token;
  };
  processNewToken = async (refresh_token: string, response: Response) => {
    try {
      this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      let user = await this.usersService.findUserByToken(refresh_token);
      if (user) {
        const { _id, fullName, email, role } = user;
        const payload = {
          sub: 'token refresh',
          iss: 'from server',
          _id,
          fullName,
          email,
          role,
        };
        //create new refresh token
        const refreshToken = this.createRefreshToken(payload);
        //update user with refresh token
        await this.usersService.updateUserToken(refreshToken, _id.toString());

        //set refresh token as cookies
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            fullName,
            email,
            role,
          },
        };
      } else {
        throw new BadRequestException('refresh token khong hop le');
      }
    } catch (error) {
      throw new BadRequestException('refresh token khong hop le');
    }
  };
  async logout(response: Response, user: IUser) {
    await this.usersService.updateUserToken('', user._id);
    response.clearCookie('refresh_token');
    return 'oke';
  }
}
