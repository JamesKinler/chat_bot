  const express = require('express')
  require('dotenv').config()
  // const bodyParser = require('body-parser')
  const {WebhookClient} = require('dialogflow-fulfillment');
  const {Card,Suggestion,Image,Payload} = require('dialogflow-fulfillment');
  const axios = require('axios');
  const app = express()
  app.use(express.json())
  const port = process.env.PORT || 3000


  app.post('/chat-bot', (request, response) => {
    chatBot(request, response)
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
  })




  const chatBot = (request, response) => {
  const agent = new WebhookClient({request: request, response: response})


  function sayHello(agent){
    agent.add("Hello my name is Austin how can i help you?")
  }

  function weatherApi(agent){
    const weather_city = agent.parameters['geo-city'].toLowerCase();
    console.log(weather_city);
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${weather_city}&units=imperial&APPID=${process.env.WEATHER_APP_ID}`)
  .then((response) => {
      // handle success
      // console.log(response.data);
      const temp = response.data.main.temp;
      agent.add(`the current temperature is ${temp}`);

    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
  }

  function imageCard(agent){
    console.log('image function');
    const payload = 
    {
      "richContent" : [
        [
          {
            "type": "image",
            "rawUrl": "https://ae01.alicdn.com/kf/H97eb3295e2c0481ca46810c39c350dbaI/New-Women-Underwear-Ice-Silk-Thong-Panties-Sexy-Briefs-Seamless-Thongs-Ladies-Panties-G-String-Tangas.jpg",
            "accessibilityText": "Example logo"
          }
        ]
      ]
    }

    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
    );
  }


  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", sayHello)
  intentMap.set("Weather", weatherApi)
  intentMap.set("image-card", imageCard)
  agent.handleRequest(intentMap)
  
}
