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
    // Weather Code
    const request = require('request');
    const weather_city = agent.parameters['geo-city-us'].toLowerCase();
    const apiKey = 'f50383b08ce3928555c6f2b6a6e21d3a';


    // const city = 'Fresno';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${weather_city}&units=imperial&appid=${apiKey}`

    request(url, (error, response, body) => {
       data = JSON.parse(body);
      // agent.add(`In ${weather_city} It's currently ${data.weather.description} with temps of ${data.main.temp}`)
      // console.log(`It's currently ${data.main.temp}`);
    })
    console.log(weather_city);

  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  intentMap.set("Need Quote", giveQuote)
  intentMap.set("Weather", weatherMap)
  agent.handleRequest(intentMap)
}
