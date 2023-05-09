  const express = require('express')
  const axios = require('axios');

  const app = express()
  const port = process.env.PORT || 3000


  app.post((request, response) => {
   
    console.log('test');
  })

  app.listen(port, () => {
    console.log(`listing on port ${port}`)
  })
