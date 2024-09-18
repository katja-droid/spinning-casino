import React, { useState, useEffect } from 'react';
import logo from './wheel_BG.png'; // Wheel image to prioritize
import top_header from './top_header.png';
import overlay from './arrow.png';
import leftImage from './left-image.png'; // New left-side image
import rightImage from './right-image.png'; // New right-side image
import pickUp from './secret_prize.png'; // New right-side image
import './App.css';

function App() {
  const [rotation, setRotation] = useState(0);
  const [spinComplete, setSpinComplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isPickUpLoaded, setIsPickUpLoaded] = useState(false); // Track if pickUp image is loaded

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = logo;
    preloadImage.onload = () => {
      setIsImageLoaded(true);
    };

    // Preload the pickUp image
    const preloadPickUp = new Image();
    preloadPickUp.src = pickUp;
    preloadPickUp.onload = () => {
      setIsPickUpLoaded(true);
    };
  }, []);

  useEffect(() => {
    // Add or remove the no-scroll class based on spinComplete state
    if (spinComplete) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class when component unmounts or when spinComplete changes
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [spinComplete]);

  const handleSpin = () => {
    const degreesArray = [44, 88, 133, 179, 225, 271, 360];
    const randomIndex = Math.floor(Math.random() * degreesArray.length);
    const degrees = degreesArray[randomIndex];
    const newRotation = rotation + degrees + 360;
    setRotation(newRotation);
    setIsButtonDisabled(true);

    setTimeout(() => {
      setSpinComplete(true);
    }, 2000);
  };

  return (
    <div className={`App ${spinComplete ? 'spin-complete' : ''}`}>
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
              <>
                <button
                  className="App-button"
                  onClick={handleSpin}
                  disabled={isButtonDisabled}
                >
                  SPIN
                </button>
                <div className="links">
                  <a href="terms.html">TERMS AND CONDITIONS</a>
                  <a href="contact.html">CONTACT US</a>
                </div>
              </>
            ) : (
              <a href="form.html" className="App-link">
                Take your gift
              </a>
            )}
          </>
        ) : (
          <>
            <div className="Top-header" src={top_header} alt="top header" />
            <h2 className="Bottom-header">YOUR FAVOURITE GAMES ANNIVERSARY</h2>
            <div className="Image-container">
              <p>Loading</p>
            </div>
            <div className="links">
              <a href="terms.html">TERMS AND CONDITIONS</a>
              <a href="contact.html">CONTACT US</a>
            </div>
          </>
        )}
      </header>

      <div className="side-images">
        <img src={leftImage} className="left-image" alt="left-side image" />
        <img src={rightImage} className="right-image" alt="right-side image" />
      </div>

      {/* Overlay that appears after the spin is complete and pickUp image is loaded */}
      {spinComplete && isPickUpLoaded && (
        <div className="overlay">
          <div className="overlay-content">
            <img className="overlay-banner" src={pickUp} alt="Pick up your prize" />
            <a href="form.html" className="App-overlay-link">
              Take your gift
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
