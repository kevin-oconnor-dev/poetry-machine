import "./RandomButton.css";
import { useState } from "react";
export default function RandomButton({ handleRandomClick }) {
  const [showRandomButton, setShowRandomButton] = useState(true);

  async function handleClick() {
    setShowRandomButton(false);
    await handleRandomClick();
    setShowRandomButton(true);
  }

  return (
    <>
      <button
        id="random-btn"
        onClick={handleClick}
        className={showRandomButton ? "" : "hidden"}
      >
        <span id="random-btn-text">Get a random poem!</span>
      </button>
    </>
  );
}
