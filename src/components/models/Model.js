import React, { useEffect, useState } from "react";
import CodeSnippet from "../shared/code-snippet/Snippet";
import TextFromImageGenerator from "./image-to-text/TextFromImageGenerator";
import SpeechToText from "./speech-to-text/SpeechToTextGenerator";
import ImageGenerator from "./text-to-image/ImageGenerator";
import SpeechGenerator from "./text-to-speech/SpeechGenerator";
import ChatGenerator from "./text-to-text/ChatGenerator";
import "./Model.css";

export default function Model({ category, code }) {
  const [downloadPath, setDownloadPath] = useState("");
  const [showSnippet, setShowSnippet] = useState(false);

  // useEffect(() => {
  //   // if(category=='text-to-text'){
  //   //   console.log(category)
  //   // }
  // }, []);

  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        setDownloadPath("/models/text-to-text/ChatGenerator.js");

        const response = await fetch("/models/text-to-text/ChatGenerator.js"); // Adjust the path accordingly
        const content = await response.text();
        setFileContent(content);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFileContent();
  }, []);

  return (
    <div className="mainContainer" id="model">
      {category == "text-to-image" && <ImageGenerator />}
      {category == "text-to-speech" && <SpeechGenerator />}
      {category == "image-to-text" && <TextFromImageGenerator />}
      {category == "text-to-text" && <ChatGenerator />}
      {category == "speech-to-text" && <SpeechToText />}
      <button
        onClick={() => {
          setShowSnippet(!showSnippet);
        }}
        className="submitButton"
      >
        {!showSnippet ? "Get code" : "Close"}
      </button>
      {showSnippet && (
        <div className="snippet">
          <CodeSnippet modelCode={code} category={category} />
        </div>
      )}
    </div>
  );
}
