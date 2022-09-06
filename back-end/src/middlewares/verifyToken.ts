import 'dotenv/config'

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ error: 'User not logged in' })

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN)

        if (decodedToken) next()
        else return res.status(401).json({ error: 'Invalid token' })
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'Intenal server error' })
    }
}
