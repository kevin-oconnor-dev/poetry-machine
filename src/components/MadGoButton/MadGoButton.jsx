import './MadGoButton.css';
import getMadlibsPoems from '../../utils/getMadlibsPoems';
import { useState } from 'react';

export default function MadGoButton({ lineNum, setFetchError }) {
  const [showGoButton, setShowGoButton] = useState(true);
  
  async function handleClick() {
    setShowGoButton(false);

    try {
      await getMadlibsPoems(lineNum);
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