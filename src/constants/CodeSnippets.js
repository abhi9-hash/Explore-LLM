export const TEXT_TO_TEXT = `
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
          Authorization: Bearer openaiApiKey,
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
`;

export const TEXT_TO_IMAGE = `
import React from "react";
import { useState } from "react";
import { Button } from "@mui/base";
import { Card } from "@mui/material";

export default function ImageGenerator() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchImage = async () => {
    setLoader(true);
    const url = process.env.REACT_APP_STABLE_DIFFUSION_URL;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "*",
        Authorization: process.env.REACT_APP_STABLE_DIFFUSION,
      },
      body: JSON.stringify({ inputs: text }),
    });
    const data = await response.blob();
    let imgurl = window.URL.createObjectURL(data);
    setImage(imgurl);
    setLoader(false);
  };
  return (
    <div className="mainContainer" id="model">
      <h1 className="heading">Image Generator</h1>
      <div className="formContainer">
        <input
          className="formControl"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Generate Any Image"
        />
        <Button
          disabled={loader && "true"}
          className="button"
          color="Primary"
          onClick={() => fetchImage()}
        >
          GET
        </Button>
      </div>

      {
        <div className="imageContainer">
          <Card className="card">
            <div className="card-img">
              {!image == "" && (
                <img width="300px" height="300px" src={image} alt="" />
              )}
            </div>
          </Card>
        </div>
      }
    </div>
  );
}
`;

export const SPEECH_TO_TEXT = `
import React, { useState, useEffect } from "react";
import "./SpeechToTextGenerator.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function SpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <div>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpeechToText;
`;

export const TEXT_TO_SPEECH = `
import React, { useState, useEffect } from "react";
import { find } from "lodash";
import VoiceChat from '@mui/icons-material/VoiceChat' 

const synth = window.speechSynthesis;

const App = () => {
  const [voicelist, setVoicelist] = useState(synth.getVoices());
  const [value, setValue] = useState("");
  const [currLang, setCurrLang] = useState(null);

  useEffect(() => {
    const updateVoices = () => {
      setVoicelist(synth.getVoices());
    };

    synth.onvoiceschanged = updateVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speakfnc = () => {
    const speakText = new SpeechSynthesisUtterance(value);
    speakText.voice = currLang;
    synth.speak(speakText);
  };

  const speakfnckey = (event) => {
    if (event.key === "Enter") {
      const speakText = new SpeechSynthesisUtterance(value);
      speakText.voice = currLang;
      synth.speak(speakText);
    }
  };

  const stopfnc = () => {
    synth.cancel();
  };

  const textchange = (event) => {
    setValue(event.target.value);
  };

  const langchng = (event) => {
    const langName = event.target.value;
    const selectedLang = find(voicelist, { name: langName });

    setCurrLang(selectedLang);
  };

  return (
    <div className="parent">
      <h1 className="heading">Text-to-Speech Converter</h1>
      
      <VoiceChat/>
      <select className="select" onChange={langchng}>
        {voicelist.map((item, index) => (
          <option key={{index}_{item.name}}>{item.name}</option>
        ))}
      </select>

      <textarea
        onKeyUp={speakfnckey}
        className="textarea"
        placeholder="Enter Text to Speak"
        onChange={textchange}
      ></textarea>

      <div className="btnparent">
        <button className="btn" onClick={speakfnc}>
          Speak
        </button>

        <button className="btn" onClick={stopfnc}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;`;

export const IMAGE_TO_TEXT = `
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

function TextFromImageGenerator() {
  const [imagePath, setImage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  const handleChange = (event) => {
    const path = URL.createObjectURL(event.target.files[0]);
    setImage(path);
    resolveImage(path);
  };

  const resolveImage = (path) => {
    setLoading(true);
    Tesseract.recognize(path, "eng", {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error("ERROR", err);
        setLoading(false);
      })
      .then((result) => {
        let text = result.data.text;
        console.log("text", text);
        setText(text);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Load an Image</h3>
        {imagePath ? (
          <section className="page">
            <img
              src={imagePath}
              ref={imageRef}
              className="App-logo"
              alt="logo"
            />
            <div className="text-box">
              <pre> {loading ? "writing your story..." : text} </pre>
            </div>
          </section>
        ) : null}

        <h3>Extracted text</h3>
        <input type="file" onChange={handleChange} />
      </main>
    </div>
  );
}

export default TextFromImageGenerator;
`;