import MadLineNumSelector from '../MadLineNumSelector/MadLineNumSelector';
import MadGoButton from '../MadGoButton/MadGoButton';
import { useState } from 'react';

export default function MadWidgets({ setFetchError, typeRef, setPoemPrint, setAppMode }) {
  const [lineNum, setLineNum] = useState(null);
  return (
    <>
      <MadLineNumSelector setLineNum={setLineNum}/>
      <MadGoButton 
        lineNum={lineNum} 
        setFetchError={setFetchError} 
        typeRef={typeRef}
        setPoemPrint={setPoemPrint}
        setAppMode={setAppMode}
      />
    </>
  )
}