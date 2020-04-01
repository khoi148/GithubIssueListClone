const express = require('express')
const app = express()

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '72ed9cbcdaa66f954d55'
const clientSecret = '3799377ed248f3f4b023f5ab3bf1e34acc59f597'

const serverport = process.env.PORT || 5000;
// Declare the redirect route
app.get('/', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {
    
    const accessToken = response.data.access_token
    console.log(response.data)
    
    // redirect the user to the home page, along with the access token
    res.redirect(`/?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
app.listen(serverport,()=>{
    console.log("Server listening on port : 5000")
})