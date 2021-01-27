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
//   const data = JSON.parse(body);
//   console.log(`It's currently ${data.main.temp}`);
// })


  app.post('/chat-bot', (request, response) => {
    chatBot(request, response)
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
  })

  const chatBot = (request, response) => {
  const agent = new WebhookClient({request, response})

  function sayHello(agent){
    agent.add("Hello my name is Austin how can i help you?")
  }

  function giveQuote(agent){
    const quote_type = agent.parameters['TypeOfQuote'].toLowerCase();
    console.log(quote_type);
    if(quote_type == "inspiration"){
      agent.add("The world is filled with roses. You need to pick one and smell it!")
    }else{
        agent.add("No Matter what people tell you, words and ideas can change the world")
    }
  }

  function weatherMap(agent){
    const weather_city = agent.parameters['sys.geo-city-us'].toLowerCase();
    console.log(weather_city);
    console.log('test');
    // agent.add(`Its rainy in ${weather_city}`)
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  intentMap.set("Need Quote", giveQuote)
  intentMap.set("Weather", weatherMap)
  agent.handleRequest(intentMap)
}
