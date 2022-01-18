import googleAuth from "../loaders/google"
import { google, docs_v1, Auth } from "googleapis"

class docsService {
    docs : docs_v1.Docs
    constructor(auth: Auth.GoogleAuth) {
        this.docs = google.docs({
            version: 'v1',
            auth
        })
    }
    public async getDocument(documentId: string): Promise<{data: Array<{endIndex: number}>, res: object}> {//?
        try {
            let res: any = await this.docs.documents.get({documentId})

            return {
                data: res.data.body.content,
                res: res.data
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    public async insertText(documentId: string, requests: any[]): Promise<object> {
        try {
            let res: any = await this.docs.documents.batchUpdate({
                auth: googleAuth,
                documentId,
                requestBody: {
                    requests
                }
            })

            return res.data
        } catch(e) {
            console.log(e)
            throw e
        }
    }
} 

export default new docsService(googleAuth)