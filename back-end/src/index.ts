import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'

import { AppDataSource } from './data-source'

import userRoutes from './routes/User'

AppDataSource.initialize()
    .then(() => {
        console.log('Database conected')
        
        const app = express()

        app.use(morgan('dev'))
        app.use(express.json())

        app.use('/', userRoutes)

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
})
    .catch((err) => {
        console.log(err)
})
