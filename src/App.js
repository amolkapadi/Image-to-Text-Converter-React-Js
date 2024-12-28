import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css"; // Include the CSS styles here

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setExtractedText("");
    }
  };

  const handleExtractText = () => {
    if (selectedImage) {
      setIsLoading(true);
      Tesseract.recognize(selectedImage, "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container">
      <h1>Image to Text Converter</h1>
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
      </div>
      <button onClick={handleExtractText} disabled={isLoading}>
        {isLoading ? "Extracting..." : "Extract Text"}
      </button>
      {extractedText && (
        <div className="output-section">
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default App;
