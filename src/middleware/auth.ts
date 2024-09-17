import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt'
export interface IGetUserAuthInfoRequest extends Request {
  admin?: string | JwtPayload | null
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const admin = verifyToken(token)
    ;(req as IGetUserAuthInfoRequest).admin = admin
    next()
  } catch (err) {
    res.clearCookie('token')
    return res.status(403).json({ message: 'Forbidden' })
  }
}
