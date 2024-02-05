import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./TextFromImageGenerator.css";

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
