const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "<YOUR_API_KEY>";

app.use(express.json());

const apiConfig = {
  endpoint: "https://api.openai.com/v1/chat/gpt",
  apiKey: "<YOUR_API_KEY>",
  defaultParams: {
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
};

async function generateResponse(prompt, params) {
  const mergedParams = { ...apiConfig.defaultParams, ...params };
  const response = await axios.post(
    apiConfig.endpoint,
    {
      prompt: prompt,
      ...mergedParams,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiConfig.apiKey}`,
      },
    }
  );
  return response.data.choices[0].text;
}

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const params = {};
  const result = await generateResponse(prompt, params);
  console.log(result);
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
