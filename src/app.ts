import config from './config'

import express from "express"

async function startServer() {

    const app = express()

    await require('./loaders').default({ expressApp: app })

    app.listen(config.port, () => {
        console.log(`App started at http://localhost:${config.port}`)
    }).on('error', err => {
        console.error(err)
        process.exit(1)
    })
}

startServer()