const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')
const crypto = require('crypto')

const pusher = new Pusher({
  appId:'619478',
  key:'8bb91164435b4f2fd756',
  secret:'8ef78f031f136894fb3f',
  cluster:'eu'
})

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res)=> {
  res.send('welcome')
})

// API route used by Pusher as a way of authenticating users
app.post('/pusher/auth', (req, res) => {
  let socketId = req.body.socket_id
  let channel = req.body.channel_name
  // Generate a random string and use as presence channel user_id
  let presenceData = {
    user_id: crypto.randomBytes(16).toString('hex')
  }
  let auth = pusher.authenticate(socketId, channel, presenceData)
  res.send(auth)
})

app.set('port', (5000))

app.listen(app.get('port'), ()=> {
  console.log('App is running on port', app.get('port'))
})
