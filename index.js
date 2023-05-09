  const express = require('express')
  const {WebhookClient} = require('dialogflow-fulfillment');
  const axios = require('axios');

  const app = express()
  const port = process.env.PORT || 3000


  app.post('/chat-bot', (request, response) => {
    chatBot(request, response)
    // console.log('test');
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
  })




  const chatBot = (request, response) => {
  const agent = new WebhookClient({request: request, response: response})


  function sayHello(agent){
    agent.add("Hello my name is Austin how can i help you?")
  }


  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  agent.handleRequest(intentMap)
}
