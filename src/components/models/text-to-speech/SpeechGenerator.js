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
          <option key={`${index}_${item.name}`}>{item.name}</option>
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

export default App;
