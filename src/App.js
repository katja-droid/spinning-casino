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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disable status
  const [imagesLoaded, setImagesLoaded] = useState({
    logo: false,
    topHeader: false,
    overlay: false,
    leftImage: false,
    rightImage: false,
  }); // State to track loading of all images

  // Preload images
  useEffect(() => {
    const images = {
      logo: logo,
      topHeader: top_header,
      overlay: overlay,
      leftImage: leftImage,
      rightImage: rightImage,
    };

    Object.keys(images).forEach((key) => {
      const img = new Image();
      img.src = images[key];
      img.onload = () => {
        setImagesLoaded((prevState) => ({
          ...prevState,
          [key]: true,
        }));
      };
    });
  }, []);

  // Function to check if all images are loaded
  const allImagesLoaded = Object.values(imagesLoaded).every(Boolean);

  // Function to handle spin
  const handleSpin = () => {
    const degreesArray = [134]; // Array of possible degrees
    const randomIndex = Math.floor(Math.random() * degreesArray.length); // Get a random index
    const degrees = degreesArray[randomIndex]; // Get the degree from the array
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
        {allImagesLoaded ? ( // Only render content if all images are loaded
          <>
            <img className="Top-header" src={top_header} alt="top header" />
            <h2 className="Bottom-header">YOUR FAVOURITE GAMES ANNIVERSARY</h2>
            <div className="Image-container">
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ transform: `rotate(${rotation}deg)` }}
                loading="eager" // Prioritize loading of the wheel image
              />
              <img src={overlay} className="App-overlay" alt="overlay" />
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
          </>
        ) : (
          <p>Loading...</p> // Display loading text or spinner until all images are loaded
        )}
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
