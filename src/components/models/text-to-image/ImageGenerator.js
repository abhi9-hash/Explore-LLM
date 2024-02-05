import "./ImageGenerator.css";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/base";
import { Card } from "@mui/material";
import Loader from "../../layout/loader/Loader";

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
      {loader && <Loader />}
    </div>
  );
}
