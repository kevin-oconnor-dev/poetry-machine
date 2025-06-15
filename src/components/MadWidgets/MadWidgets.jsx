import MadLineNumSelector from '../MadLineNumSelector/MadLineNumSelector';
import MadGoButton from '../MadGoButton/MadGoButton';
import { useState } from 'react';

export default function MadWidgets({ setFetchError, typeRef }) {
  const [lineNum, setLineNum] = useState(null);
  return (
    <>
      <MadLineNumSelector setLineNum={setLineNum}/>
      <MadGoButton lineNum={lineNum} setFetchError={setFetchError} typeRef={typeRef} />
    </>
  )
}