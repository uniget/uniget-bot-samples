# Create and upload bots to Uniget

[Viedo Tutorial](https://www.youtube.com/watch?v=6GLFcm7dGiY)

This tutorial explains how to create and upload a chatbot to Uniget so users can find your bot. You can use examples from this repository using NodeJS.

## 1. Get your developer token

Sign In  to get your developer token.

## 2. Create an endpoint for handling requests

Create HTTP POST Endpoint to handle message requests from users like this:

`POST https://YOUR-BACKEND-DOMAIN/messages/YOUR-UNIGET-TOKEN`  

You will receive from Uniget the text that the user sent and the session ID. You will receive this entry point from Uniget when needed and take care of your bot logic. The following are sample examples using NodeJS:

app.post(`/messages/${TOKEN}`, async (req, res) => {					
	res.send(`The text is ${req.body.text} and the sessionId is ${req.body.sessionId}`);
});

## 3. Deploy the chatbot to hosting service

Deploy your chatbot to a hosting service of your choice like  [AWS](https://aws.amazon.com/),  [Google Cloud](https://cloud.google.com/),  [Azure](https://azure.microsoft.com/)  etc.

## 4. Register your bot

Register your bot by calling the following HTTP request:

`GET https://uniget-back.oa.r.appspot.com/messages/init?token=YOUR-TOKEN&title=BOT-TITLE&endpoint=YOUR-ENDPOINT-FOR-HANDELING-REQUESTS`  
  
Here is an example using NodeJS:

```
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

const setup = async () => {
  try {      
    let url = `${API_URL}/messages/init?token=${TOKEN}&title=${TITLE}&endpoint=${encodeURIComponent(MY_ENDPOINT)}&image=${encodeURIComponent(IMAGE)}`
    const res = await axios.get(url)
      return res;
  } catch (err) {
      console.log(err);
  }
}
```

## 5. Get reviewed

Uniget team will test your bot and expose it to users with relevant requests.

## 6. Expand functionality

Expand your functionality with your own code or with services like  [Dialogflow](https://dialogflow.cloud.google.com/).

## Well done! Your bot is connected to the Uniget network!
