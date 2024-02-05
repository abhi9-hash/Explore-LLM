import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  IMAGE_TO_TEXT,
  SPEECH_TO_TEXT,
  TEXT_TO_IMAGE,
  TEXT_TO_SPEECH,
  TEXT_TO_TEXT,
} from "../../../constants/CodeSnippets";

const CodeSnippet = ({ category, modelCode }) => {
  const alert = useAlert();
  let code = ``;
  if (!modelCode || modelCode.trim() == "") {
    if (category == "text-to-text") {
      code = TEXT_TO_TEXT;
    }
    if (category == "text-to-speech") {
      code = TEXT_TO_SPEECH;
    }
    if (category == "speech-to-text") {
      code = SPEECH_TO_TEXT;
    }
    if (category == "text-to-image") {
      code = TEXT_TO_IMAGE;
    }
    if (category == "image-to-text") {
      code = IMAGE_TO_TEXT;
    }
  } else {
    code = modelCode;
  }

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert.success("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying code:", error);
      });
  }, [code]);

  return (
    <SyntaxHighlighter language="javascript" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
