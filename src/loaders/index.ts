import expressLoader from "./express"
import { Application } from "express"

export default async ({expressApp}: {expressApp: Application}) => {
    await expressLoader({ app: expressApp })
}