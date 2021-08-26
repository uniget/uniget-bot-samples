require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
app.use(express.json());
app.use(cors());

const TOKEN = 'YOUR_TOKEN';
const DIALOGFLOW_PROJECT_ID = 'YOUR_DIALOGFLOW_PROJECT_ID';
const TITLE = 'BOT_NAME';
const MY_DOMAIN = 'YOUR_SERVER_DOMAIN';
const MY_ENDPOINT = `${MY_DOMAIN}/messages/${TOKEN};`

const API_URL = 'https://uniget-back.oa.r.appspot.com'

app.get(`/init`, async (req, res) => {
    let response = await setup();
    res.send(response.data);
});

app.post(`/messages/${TOKEN}`, async (req, res) => {
    const dialogResponse = await callDialogFlow(req.body.text, req.body.sessionId);
    res.send(dialogResponse);
});

const setup = async () => {
  try {        
      const res = await axios.get(`${API_URL}/messages/init?token=${TOKEN}&title=${TITLE}&endpoint=${MY_ENDPOINT}`);
      return res;
  } catch (err) {
      console.log(err);
  }
}

async function callDialogFlow(text, sessionId) {
    // A unique identifier for the given session
    const projectId = DIALOGFLOW_PROJECT_ID;
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({keyFilename: 'dialogflowconfig.json'});
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
    // Send request and log result
    try{
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      return result.fulfillmentText;
    }
    catch(err){
        console.log(err);
        return '';
    }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
      console.log(`App running on port ${PORT}`)
      await setup()
});  
