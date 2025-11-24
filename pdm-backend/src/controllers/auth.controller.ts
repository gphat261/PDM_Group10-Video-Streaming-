import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const result = await authService.register(username, email, password);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Register failed' });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const result = await authService.login(email, password);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Login failed' });
  }
};
 