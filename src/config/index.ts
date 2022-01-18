import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

dotenv.config()

export default {
    //port
    port: parseInt(<string>process.env.PORT, 10),
    //api config
    api: {
        prefix: "/api"
    },
    //telergram bot token
    telegramToken: <string>process.env.TELGRAM_TOKEN,
    //telegram bot chatId
    telegramChatId: parseInt(<string>process.env.TEKGRAM_CHAT_ID, 10)
}
