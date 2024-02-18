import React, { useState, useEffect } from "react";
import { find } from "lodash";
import VoiceChat from '@mui/icons-material/VoiceChat' 
import './SpeechGenerator.css'

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

  const speakHandler = () => {
    const speakText = new SpeechSynthesisUtterance(value);
    speakText.voice = currLang;
    synth.speak(speakText);
  };

  const speakHandlerKey = (event) => {
    if (event.key === "Enter") {
      const speakText = new SpeechSynthesisUtterance(value);
      speakText.voice = currLang;
      synth.speak(speakText);
    }
  };

  const stopHandler = () => {
    synth.cancel();
  };

  const textChange = (event) => {
    setValue(event.target.value);
  };

  const langChange = (event) => {
    const langName = event.target.value;
    const selectedLang = find(voicelist, { name: langName });

    setCurrLang(selectedLang);
  };

  return (
    <div className="parent">
      <h1 className="heading">Text-to-Speech Converter</h1>
      
      <VoiceChat/>
      <select className="select" onChange={langChange}>
        {voicelist.map((item, index) => (
          <option key={`${index}_${item.name}`}>{item.name}</option>
        ))}
      </select>

      <textarea
        onKeyUp={speakHandlerKey}
        className="textarea"
        placeholder="Enter Text to Speak"
        onChange={textChange}
      ></textarea>

      <div className="btnparent">
        <button className="btn" onClick={speakHandler}>
          Speak
        </button>

        <button className="btn" onClick={stopHandler}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;
