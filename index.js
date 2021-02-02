  const express = require('express')
  const bodyParser = require('body-parser')
  const {WebhookClient} = require('dialogflow-fulfillment');
  const axios = require('axios');

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

  function weatherApi(agent){
    // agent.add("the weather is cold")
    const weather_city = agent.parameters['geo-city-us'].toLowerCase();
    console.log(weather_city);
    // return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${weather_city}&units=imperial&APPID=f50383b08ce3928555c6f2b6a6e21d3a`)
    // .then(function (response) {
    //   // handle success
    //   console.log(response.data);
    //   // response.data.main.map(weatherObj =>{
    //   //   agent.add(weatherObj.temp);
    //   // });
    //   // agent.add(response.data.main.temp);
    //
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
  }


  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  intentMap.set("Need Quote", giveQuote)
  intentMap.set("Weather", weatherApi)
  agent.handleRequest(intentMap)
}
