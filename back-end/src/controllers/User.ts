import 'dotenv/config'

import { Request, Response } from 'express'
import { userRepository } from '../repositories/User'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        try {
            if (await userRepository.findOneBy({ email }))
                return res.status(409).json({ error: 'Email already exists' })

            bcrypt.hash(password, 10).then(async (hash) => {
                const user = userRepository.create({
                    name,
                    email,
                    password: hash,
                })

                await userRepository.save(user)

                return res.status(201).json(user)
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Intenal server error' })
        }
    }

    async auth(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const user = await userRepository.findOneBy({ email })
            if (!user) return res.status(404).json({ error: 'User not found' })

            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match)
                    return res.status(401).json({ error: 'Password not match' })

                const token = jwt.sign({ id: user.id }, process.env.TOKEN)

                return res.status(200).json({ user, token })
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await userRepository.find()

            if (!users)
                return res.status(404).json({ message: 'None user finder' })

            return res.status(200).json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async findOneById(req: Request, res: Response) {
        const { userId } = req.params

        try {
            const user = await userRepository.findOneBy({ id: Number(userId) })

            if (!user)
                return res.status(404).json({ message: 'User do not exist' })

            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params
        const { name, email } = req.body

        try {
            if (await userRepository.findOneBy({ email }))
                return res.status(409).json({ error: 'Email already exists' })

            const user = await userRepository.update(
                { id: Number(userId) },
                { name, email }
            )

            if (!user)
                return res.status(404).json({ message: 'User do not exist' })

            return res.status(200).json({ message: 'User was edited' })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async deleteOneById(req: Request, res: Response) {
        const { userId } = req.params

        try {
            const user = await userRepository.findOneBy({ id: Number(userId) })

            if (!user)
                return res.status(404).json({ message: 'User do not exist' })

            await userRepository.delete(user)
            return res.status(200).json({ message: 'User was deleted' })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}
