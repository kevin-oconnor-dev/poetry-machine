import './MadGoButton.css';
import buildMadlibsPoem from '../../utils/buildMadlibsPoem';
import { useState } from 'react';

export default function MadGoButton({ lineNum, setFetchError, typeRef, setPoemPrint, setAppMode }) {
  const [showGoButton, setShowGoButton] = useState(true);
  
  async function handleClick() {
    setShowGoButton(false);
    setAppMode('loading');

    try {
      await buildMadlibsPoem(typeRef, lineNum, setPoemPrint);
    } catch(err) {
      setAppMode('madlibs');
      setFetchError(true);
      console.error('Madlibs fetch error: ', err);
      setTimeout(() => {
        setFetchError(false);
      }, 3000);
      return;
    } finally {
      setShowGoButton(true);
    }
    
    setAppMode('madlibs-poem')
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