import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import { AppDataSource } from './database/data-source'

import userRoutes from './routes/User'

AppDataSource.initialize()
    .then(() => {
        console.log('Database conected')

        const app = express()

        app.use(morgan('dev'))

        app.use(bodyParser.json())

        app.use('/', userRoutes)

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
