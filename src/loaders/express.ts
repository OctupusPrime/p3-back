import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import config from "../config"
import routes from "../routes"
import cors from "cors"

export default ({app}: {app: express.Application}) => {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy')

    //if cors register after route "Health check" ot wont work for it
    app.use(cors())

    //bodyParser for body req and file upload for req.files
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(fileUpload())

    //load routes
    app.use(config.api.prefix, routes())

    // Health check
    app.get('/status', (req, res) => {
        res.status(200).end()
    })
    app.head('/status', (req, res) => {
        res.status(200).end()
    })
}