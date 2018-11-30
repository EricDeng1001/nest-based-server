import { Injectable } from '@nestjs/common';
import { InjectRespository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInitInfo } from './interfaces';
import { User } from './user.enetity';
import crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRespository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async createFresh(user_init_info: UserInitInfo) {
    if (await this.userRepo.findOne({ email: user_init_info.email })) {
      throw 'email used';
    }
    if (await this.userRepo.findOne({ username: user_init_info.username })) {
      throw 'username used';
    }
    let hash = crypto.createHash('sha256');
    hash.update(Math.random().toString());
    let salt = hash.digest('hex');
    let hmac = crypto.createHamc('sha256', salt);
    hmac.update(user_init_info.password);
    user_init_info.password = hmac.digest('hex');
    user_init_info.salt = salt;
    let fresh_user = new User(user_init_info);
    await this.userRepo.save(fresh_user);
  }

  async validatePassword(cert_pass_pair: CertPassPair) {
    let user_to_verfify = await this.userRepo.findOne({ username: cert_pass_pair.username });
    if (!user_to_verfify) {
      throw 'user not exist';
    }

    let salt = user_to_verfify.salt;
    let hmac = crypto.createHamc('sha256', salt);
    hmac.update(cert_pass_pair.password);
    let s_password = hmac.digest('hex');

    if (s_password == user_to_verfify.password) {
      return true;
    } else {
      throw 'password incorrect';
    }
  }
}
