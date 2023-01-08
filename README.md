# ChatGPT-Node

- This is a Node.js server built with the Express framework that listens for POST requests at the /chat endpoint. When a request is received, the server sends a POST request to the Chat GPT API with the prompt in the request body and the specified parameters. The response from the API is then logged to the console and returned to the client in the server's response.

- To use this code, you will need to install the express and axios dependencies. You will also need to replace <YOUR_API_KEY> with your own API key.

- The server listens on port 3000, so you can send requests to it at http://localhost:3000/chat. The request body should include a prompt field with the text you want to send to the Chat GPT API.
