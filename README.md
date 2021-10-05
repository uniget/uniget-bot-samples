Create and upload bots to Uniget




This tutorial explains how to create and upload a chatbot to Uniget so users can find your bot. You can use examples from this Github repository with chatbot code examples using NodeJS.

1. Get your developer token
 to get your developer token.


2. Create an endpoint for handling requests

Create HTTP POST Endpoint to handle message requests from users like this:

POST https://YOUR-BACKEND-DOMAIN/messages/YOUR-UNIGET-TOKEN

You will receive from Uniget the text that the user sent and the session ID. You will receive this entry point from Uniget when needed and take care of your bot logic. The following are sample examples using NodeJS:

 
app.post(`/messages/${TOKEN}`, async (req, res) => {					
	res.send(`The text is ${req.body.text} and the sessionId is ${req.body.sessionId}`);
});

3. Deploy the chatbot to hosting service

Deploy your chatbot to a hosting service of your choice like AWS, Google Cloud, Azure etc.


4. Register your bot

Register your bot by calling the following HTTP request:

GET https://uniget-back.oa.r.appspot.com/messages/init?token=YOUR-TOKEN&title=BOT-TITLE&endpoint=YOUR-ENDPOINT-FOR-HANDELING-REQUESTS

Here is an example using NodeJS:


const TOKEN = 'YOUR_TOKEN';
const TITLE = 'BOT_NAME';
const MY_DOMAIN = 'YOUR_SERVER_DOMAIN';
const MY_ENDPOINT = `${MY_DOMAIN}/messages/${TOKEN}`;
const API_URL = 'https://uniget-back.oa.r.appspot.com';

app.get('/init', async (req, res) => {
	let response = await setup();
	res.send(response.data);
});

const setup = async () => {
  try {        
	  const res = await axios.get(`${API_URL}/messages/init?token=${TOKEN}&title=${TITLE}&endpoint=${MY_ENDPOINT}`);
	  return res;
	} catch (err) {
		console.log(err);
	}
}

5. Get reviewed

Uniget team will test your bot and expose it to users with relevant requests.


6. Expand functionality
Expand your functionality with your own code or with services like Dialogflow.


Well done! Your bot is connected to the Uniget network!
