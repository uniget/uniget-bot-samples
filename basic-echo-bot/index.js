require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const TOKEN = 'YOUR_TOKEN';
const TITLE = 'BOT_NAME';
const IMAGE = 'https://firebasestorage.googleapis.com/v0/b/ultimate-2c4e3.appspot.com/o/download.png?alt=media&token=5ec7f168-d413-4267-94d0-426535c885b0';
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
    let url = `${API_URL}/messages/init?token=${TOKEN}&title=${TITLE}&endpoint=${encodeURIComponent(MY_ENDPOINT)}&image=${encodeURIComponent(IMAGE)}`
    const res = await axios.get(url)
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
