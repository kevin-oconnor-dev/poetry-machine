import './MadGoButton.css';
import buildMadlibsPoem from '../../utils/buildMadlibsPoem';
import { useState } from 'react';

export default function MadGoButton({ lineNum, setFetchError, typeRef }) {
  const [showGoButton, setShowGoButton] = useState(true);
  
  async function handleClick() {
    setShowGoButton(false);

    try {
      await buildMadlibsPoem(typeRef, lineNum);
    } catch(err) {
      setFetchError(true);
      console.error('Madlibs fetch error: ', err);
      setTimeout(() => {
        setFetchError(false);
      }, 3000);
    }
    setShowGoButton(true);
  }
  
  return (
    <>
      <button
        id="mad-go-btn"
        onClick={handleClick}
        className={showGoButton ? "" : "hidden"}
      >
        <span id="mad-go-btn-text">Go!</span>
      </button>
    </>
  );
}