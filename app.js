require('dotenv').config({path: __dirname + '/.env'})

const User = require("./models/user")
const Zenbot = require("./models/Zenbot")

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const eventsApi = require('@slack/events-api')
const slackEvents = eventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET)

const token = process.env.SLACK_BOT_TOKEN

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
    logLevel: LogLevel.DEBUG
});

app.use('/', slackEvents.expressMiddleware())

slackEvents.on('message', async (event) => {
    console.log(event)
    const user = await client.users.info({
        token,
        user: event.user
    })
    const {id, name} = user.user
    if(!event.bot_profile){
        const user = User.findOrCreate({name, id, online: false})
        const zenbot = new Zenbot(event.text, user, client, token, event.channel)
        zenbot.response() 
        
    }
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
