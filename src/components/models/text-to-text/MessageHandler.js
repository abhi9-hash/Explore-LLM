import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

const messageHandler = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { response } = await model.generateContent(message);

    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error communicating with model:", error);
    return "Please purchase me for interacting";
  }
};

export default messageHandler;
