import jwt from 'jsonwebtoken'

const secret: string = process.env.SECRET_WORD as string

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired')
    }
    throw new Error('Invalid token')
  }
}
