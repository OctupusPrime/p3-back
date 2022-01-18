import { Router } from "express"
import upload from "./upload"

export default () => {
    const app = Router()
    
    upload(app)

    return app
}