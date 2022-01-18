import driveService from "../services/drive"
import docsService  from "../services/docs"
import telegramService  from "../services/telegram"
import { Router, Request, Response } from "express"
import stream from 'stream'

const route = Router()

telegramService

export default (app: Router) => {
    app.use('/upload', route)
    //поменять на post
    route.post('/', async (req: Request, res: Response) => {        
        let bufferStream = new stream.PassThrough()     
        //@ts-ignore
        bufferStream.end(req.files.file.data)

        const docsReqData = JSON.parse(req.body.data)

        let docId, docCopyId, tableId

        try {
            //these
            docId = await driveService.UploadFile(
                `${docsReqData.authors[0].surnameEng}.docx`,
                '1n4Ji871B0eglyKpR2vneEkbgDhe5mHfa', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                bufferStream) //upload file
            docCopyId = await driveService.CopyFile(
                    docId, 
                    '1n4Ji871B0eglyKpR2vneEkbgDhe5mHfa',
                    'application/vnd.google-apps.document') //create copy googleDocx

            const {data: copyData} = await docsService.getDocument(docCopyId) //get content of file
            await docsService.insertText(
                    docCopyId,
                    require('../config/api/docs/mergeReq').default(copyData, docsReqData)) //insert text to google docx
            const docBuffer = await driveService.DownloadFile(
                    docCopyId,
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document') //download file
            //table
            tableId = await driveService.UploadFile(
                    `${docsReqData.authors[0].surnameEng}Table`,
                    '1n4Ji871B0eglyKpR2vneEkbgDhe5mHfa',
                    'application/vnd.google-apps.document')
            await docsService.insertText(
                    tableId,
                    require('../config/api/docs/mergeTableReq').default(docsReqData.authors)) //insert text to google docx    

            const tableData = await driveService.DownloadFile(
                    tableId,
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document') //download file

            await driveService.DeleteFile(docId) //delete orig doc file
            docId = null
            await driveService.DeleteFile(docCopyId) //delete doc copy file
            docCopyId = null
            await driveService.DeleteFile(tableId) //delete table file
            tableId = null

            await telegramService.sendFile(
                docBuffer, 
                docsReqData.authors[0].surname,
                `Призвише: ${docsReqData.authors[0].surnameEng}\nТелефон: ${docsReqData.authors[0].phone},\nEmail: ${docsReqData.authors[0].email}`) //send via telegram bot
            await telegramService.sendFile(
                tableData, 
                `${docsReqData.authors[0].surnameEng}Table`) //send via telegram bot

            return res.json({message: 'Завантажено'})
        } catch(e) {
            console.log(e)
            if (docId) 
                await driveService.DeleteFile(docId)
            if (docCopyId)
                await driveService.DeleteFile(docCopyId)
            if (tableId)
                await driveService.DeleteFile(tableId) 

            throw res.status(500).json({message: 'Проблема на сервері спробуйте пізніше'})
        }
    })
}
