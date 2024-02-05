import axios from "axios";

const openaiApiKey = process.env.REACT_APP_OPENAI_KEY
const openaiApiUrl = process.env.REACT_APP_OPENAI_URL

const sendMessageToChatGPT = async (message) => {
  try {
    const response = await axios.post(
      openaiApiUrl,
      {
        prompt: message,
        max_tokens: 150,
        model:"gpt-3.5-turbo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0]?.text.trim();
  } catch (error) {
    console.error("Error communicating with ChatGPT:", error);
    return "Please purchase me for interacting";
  }
};

export default sendMessageToChatGPT;
