import React, { useState } from 'react';
import logo from './wheel_BG.svg';
import top_header from './top_header.svg';
import overlay from './arrow.png';
import leftImage from './left-image.png'; // New left-side image
import rightImage from './right-image.png'; // New right-side image
import './App.css';

function App() {
  const [rotation, setRotation] = useState(0);
  const [spinComplete, setSpinComplete] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disable status

  const handleSpin = () => {
    const degrees = 134;
    const newRotation = rotation + degrees;
    setRotation(newRotation);
    setIsButtonDisabled(true); // Disable the button after clicking

    setTimeout(() => {
      setSpinComplete(true);
    }, 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="Top-header" src={top_header} alt="top header" />
        <h2 className="Bottom-header">YOUR FAVOURITE GAMES ANNIVERSARY</h2>
        <div className="Image-container">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <img
            src={overlay}
            className="App-overlay"
            alt="overlay"
          />
        </div>

        {!spinComplete ? (
          <button
            className="App-button"
            onClick={handleSpin}
            disabled={isButtonDisabled} // Disable the button based on state
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
      </header>

      {/* Images with fixed positioning */}
      <div className="side-images">
        <img src={leftImage} className="left-image" alt="left-side image" />
        <img src={rightImage} className="right-image" alt="right-side image" />
      </div>
    </div>
  );
}

export default App;
