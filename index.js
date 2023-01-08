const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "<YOUR_API_KEY>";

app.use(express.json());

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await axios.post(
    "https://api.openai.com/v1/chat/gpt",
    {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const result = response.data.choices[0].text;
  console.log(result);
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
