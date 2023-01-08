import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

const apiConfig = {
  endpoint: "https://api.openai.com/v1/chat/gpt",
  apiKey: "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",
  defaultParams: {
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
};

async function generateResponse(prompt: string, params: any): Promise<string> {
  try {
    const mergedParams = { ...apiConfig.defaultParams, ...params };
    const response = await axios.post(
      apiConfig.endpoint,
      {
        prompt,
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
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const params = {};
    const result = await generateResponse(prompt, params);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while communicating with the API.");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
