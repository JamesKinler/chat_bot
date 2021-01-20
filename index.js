  const express = require('express')
  const bodyParser = require('body-parser')
  const {WebhookClient} = require('dialogflow-fulfillment');

  const app = express()
  app.use(bodyParser.json())
  const port = process.env.PORT || 3000




  app.post('/chat-bot', (request, response) => {
    chatBot(request, response)
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
  })

  const chatBot = (request, response) => {
  const agent = new WebhookClient({request, response})



  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  agent.handleRequest(intentMap)
}
