require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const TOKEN = 'YOUR_TOKEN';
const TITLE = 'BOT_NAME';
const MY_DOMAIN = 'YOUR_SERVER_DOMAIN';
const MY_ENDPOINT = `${MY_DOMAIN}/messages/${TOKEN}`;
const API_URL = 'https://uniget-back.oa.r.appspot.com';

app.get(`/init`, async (req, res) => {
    let response = await setup();
    res.send(response.data);
});

app.post(`/messages/${TOKEN}`, async (req, res) => {
    res.send(`The text is ${req.body.text} and the sessionId is ${req.body.sessionId}`);
});

const setup = async () => {
  try {        
      const res = await axios.get(`${API_URL}/messages/init?token=${TOKEN}&title=${TITLE}&endpoint=${MY_ENDPOINT}`);
      return res;
  } catch (err) {
      console.log(err);
  }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
      console.log(`App running on port ${PORT}`)
      await setup()
});  
