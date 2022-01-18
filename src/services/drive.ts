import googleAuth from "../loaders/google"
import { google, drive_v3, Auth } from "googleapis"
import { PassThrough } from "stream"

// ts-ignore bcs @types/googleapis dont have resource in @types (genius)

class driveService {
    drive: drive_v3.Drive
    constructor(auth: Auth.GoogleAuth) {
        this.drive = google.drive({
            version: 'v3',
            auth
        })
    }
    public async CreateEmptyFile(name: string, parent: string = '', mimeType: string): Promise<string> {
        try {
            let res: any = await this.drive.files.create({
                // @ts-ignore
                resource: {
                    name,
                    parents: [parent],
                    mimeType
                },
                fields: 'id'
            })
            return res.data.id
        } catch(e) {
            console.log(e)
            throw e
        }
    }
    public async UploadFile(name: string, parent: string = '', mimeType: string, body?: PassThrough): Promise<string> {
        try {
            let res: any = await this.drive.files.create({
                // @ts-ignore
                resource: {
                    name,
                    parents: [parent],
                    mimeType
                }, 
                media: {
                    mimeType,
                    body
                },
                fields: 'id'
            })
            return res.data.id
        } catch(e) {
            console.log(e)
            throw e
        }
    }
    public async CopyFile(fileId: string, parent: string = '', mimeType: string): Promise<string> {
        try {
            let res: any = await this.drive.files.copy({
                // @ts-ignore
                resource: {
                    mimeType,
                    parents: [parent]
                },
                fileId,
                fields: 'id'
            })
            return res.data.id
        } catch(e) {
            console.log(e)
            throw e  
        }
    }
    public async DownloadFile(id: string, mimeType: string): Promise<string> {
        try {
            let res: any = await this.drive.files.export({
                fileId: id,
                mimeType
            }, {responseType: 'arraybuffer'})

            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }

    }
    public async DeleteFile(fileId: string): Promise<void> {
        try {
            await this.drive.files.delete({fileId})
        } catch (e) {
            console.log(e)
            throw e
        }
    }
} 

export default new driveService(googleAuth)