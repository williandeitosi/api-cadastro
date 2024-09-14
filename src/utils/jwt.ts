import jwt from "jsonwebtoken"
// TODO: read and understand that happens here


const secret = 'my_secret'

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secret, { expiresIn: "1h" })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        return null
    }
}