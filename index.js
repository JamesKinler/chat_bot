  const express = require('express')
  const bodyParser = require('body-parser')
  const {WebhookClient} = require('dialogflow-fulfillment');

  const app = express()
  app.use(bodyParser.json())
  const port = process.env.PORT || 3000

// const TYPE_OF_Quote = 'TypeOfQuote'


// Weather Code
// const request = require('request');
// const apiKey = 'f50383b08ce3928555c6f2b6a6e21d3a';
//
// const city = 'Fresno';
// const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
//
// request(url, (error, response, body) => {
//   console.log(body);
// })


  app.post('/chat-bot', (request, response) => {
    chatBot(request, response)
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
    console.log('thongs');
  })

  const chatBot = (request, response) => {
  const agent = new WebhookClient({request, response})



  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  agent.handleRequest(intentMap)
}
