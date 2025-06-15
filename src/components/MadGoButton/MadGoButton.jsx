import "./MadGoButton.css";
import { useState } from 'react';

export default function MadGoButton() {
  const [showGoButton, setShowGoButton] = useState(true);
  
  async function handleClick() {
    setShowGoButton(false);
    // TODO: add madlibs function
    setShowGoButton(true);
  }
  
  return (
    <>
      <button
        id="mad-go-btn"
        onClick={handleClick}
        className={showGoButton ? "" : "hidden"}
      >
        <span id="mad-go-btn-text">Get a random poem!</span>
      </button>
    </>
  );
}