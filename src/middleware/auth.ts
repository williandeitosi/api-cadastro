import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt'
export interface IGetUserAuthInfoRequest extends Request {
  admin: string | JwtPayload | null
}

export const authenticateJWT = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token

  try {
    const admin = verifyToken(token)
    req.admin = admin
    next()
  } catch (err) {
    res.clearCookie('token')
    return res.status(400).json({ message: 'Forbiden' })
  }
}
