import { google } from "googleapis"

const KEYFILEPATH = "./credentials.json"

const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']

export default new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})