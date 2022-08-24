import { Request, Response } from 'express'
import { userRepository } from '../repositories/User'

export class UserController {
    
    async create(req: Request, res: Response) {
        const {firstName, lastName, age} = req.body

        try {

            const user = userRepository.create({ firstName, lastName, age })
            await userRepository.save(user)

            return res.status(201).json(user)
    
        } catch(err) {

            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })

        }
    }

    async findAll(req: Request, res: Response) {
        try {

            const users = await userRepository.find()

            if (!users) {
                return res.status(404).json({ message: 'None user finder' })    
            }

            return res.status(200).json(users)

        } catch(err) {

            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })

        }
    }

    async findOneById(req: Request, res: Response) {
        const { userId } = req.params

        try {

            const user = await userRepository.findOneBy({ id: Number(userId)})

            if (!user) {
                return res.status(404).json({ message: 'User do not exist' })    
            }

            return res.status(200).json(user)

        } catch(err) {

            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })

        }
    }

    async deleteOneById(req: Request, res: Response) {
        const { userId } = req.params

        try {

            const user = await userRepository.findOneBy({ id: Number(userId)})

            if (!user) {
                return res.status(404).json({ message: 'User do not exist' })    
            }

            await userRepository.delete(user)
            return res.status(200).json({ message: 'User deleted' })

        } catch(err) {

            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })

        }
    }
}
