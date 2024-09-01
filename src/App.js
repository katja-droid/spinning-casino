import React, { useState, useEffect } from 'react';
import logo from './wheel_BG.png'; // Wheel image to prioritize
import top_header from './top_header.png';
import overlay from './arrow.png';
import leftImage from './left-image.png'; // New left-side image
import rightImage from './right-image.png'; // New right-side image
import './App.css';
function App() {
  const [rotation, setRotation] = useState(0);
  const [spinComplete, setSpinComplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = logo;
    preloadImage.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  const handleSpin = () => {
    const degreesArray = [134];
    const randomIndex = Math.floor(Math.random() * degreesArray.length);
    const degrees = degreesArray[randomIndex];
    const newRotation = rotation + degrees;
    setRotation(newRotation);
    setIsButtonDisabled(true);

    setTimeout(() => {
      setSpinComplete(true);
    }, 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isImageLoaded ? (
          <>
            <img className="Top-header" src={top_header} alt="top header" />
            <h2 className="Bottom-header">YOUR FAVOURITE GAMES ANNIVERSARY</h2>
            <div className="Image-container">
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ transform: `rotate(${rotation}deg)` }}
                loading="eager"
              />
              <img src={overlay} className="App-overlay" alt="overlay" />
            </div>
            {!spinComplete ? (
              <button
                className="App-button"
                onClick={handleSpin}
                disabled={isButtonDisabled}
              >
                SPIN
              </button>
            ) : (
              <a href="form.html" className="App-link">
                TAKE YOUR GIFT
              </a>
            )}
            <div className="links">
              <a href="terms.html">TERMS AND CONDITIONS</a>
              <a href="contact.html">CONTACT US</a>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </header>

      {/* Placeholder for side images */}
      <div className="side-images">
        <div className="image-placeholder left-image"></div>
        <div className="image-placeholder right-image"></div>
      </div>
    </div>
  );
}

export default App;


  // const handleSpin = () => {
  //   const degrees = 494;
  //   const newRotation = rotation + degrees;
  //   setRotation(newRotation);
  //   setIsButtonDisabled(true); // Disable the button after clicking    45 90 125 180 225 270 360

  //   setTimeout(() => {
  //     setSpinComplete(true);
  //   }, 2000);
  // };
  //RANDOM