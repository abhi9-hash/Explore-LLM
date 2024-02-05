import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import axios from "axios";

import ImageUpload from "./ImageUpload";
import "./ModelForm.css";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  "text-to-text",
  "text-to-speech",
  "speech-to-text",
  "text-to-image",
  "image-to-text",
];

const ModelForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: ``,
    featured: false,
    category: categories[0],
    inService: true,
    numOfReviews: 0,
    inService: true,
  });

  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      images: [
        {
          public_id: imageUrl,
          url: imageUrl,
        },
      ],
    };

    const response = await axios.post(
      "http://localhost:4000/models/create",
      body
    );

    console.log({ response });

    navigate("/models");
  };

  return (
    <div className="form-container">
      <h2>Model Form</h2>
      <FormControl>
        <div className="form-group">
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <TextareaAutosize
            type="textarea"
            multiple
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Code:</label>
          <CodeMirror
            value={formData.code}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) =>
              setFormData({ ...formData, code: value })
            }
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <Select
            variant="standard"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>

        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

        <div className="button-container">
          <button
            disabled={
              formData.name == "" ||
              formData.description == "" ||
              formData.code == `` ||
              imageUrl == null
            }
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </FormControl>
    </div>
  );
};

export default ModelForm;
