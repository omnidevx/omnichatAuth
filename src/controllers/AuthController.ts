import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    console.log('inside login');
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      console.log('couldnt find user');
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      console.log('password wrong');
      return;
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    console.log(id);

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };

  static verify = async (req: Request, res: Response) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      console.log(error);
      res.status(401).send();
      return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
      expiresIn: '1h'
    });
    res.setHeader('token', newToken);
    res.status(200).send();
    return;
  };
}
export default AuthController;
