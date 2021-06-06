  
const fetch = require('node-fetch');

const url = 'https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development'
const appId = '2710638a-a986-442f-b029-feb40bd4d4dd'


  async function herman() {

    const response = await fetch(`${url}/collections/U-`, {
      method: 'GET',
      headers: {
        'x-application-id': appId,
        "Content-Type": "application/json"
      },
    })

    const text = await response.json();



    console.log(text.map(x =>JSON.parse(x.value)))
  
  }
  herman();

