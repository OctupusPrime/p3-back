import TelegramBot from "node-telegram-bot-api"
import telegramApi from 'node-telegram-bot-api'
import config from '../config'

class telegramService {
    bot: TelegramBot
    constructor(token: string) {
        this.bot = new telegramApi(token, {polling: true})
        this.bot.on('message', msg => {
            const chatId = msg.chat.id
            if (msg.text === '/poop')
                this.sendMessage(chatId, 'Бот покакал')
        })
    }
    public async sendMessage(chatId: number, text: string) {
        await this.bot.sendMessage(chatId, text)
    }
    public async sendFile(file: any, filename: string, caption?: string) {
        const fileOptions = {
            filename: `${filename}.docx`,
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }
        await this.bot.sendDocument(config.telegramChatId, Buffer.from(file), {caption}, fileOptions)
    }
}

export default new telegramService(config.telegramToken)