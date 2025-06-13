import './App.css';
import AuthorInput from './components/AuthorInput/AuthorInput';
import ChangeModeButton from './components/ChangeModeButton/ChangeModeButton';
import MainHeading from './components/MainHeading/MainHeading';
import RandomButton from './components/RandomButton/RandomButton';
import PoemTitle from './components/PoemTitle/PoemTitle'
import LineLimit from './components/LineLimit/LineLimit';
import getPoem from './utils/getPoem';
import typeText from './utils/typeText';
import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [appMode, setAppMode] = useState('default');
  const [userEntry, setUserEntry] = useState('');
  const [lineLimit, setLineLimit] = useState(0);
  const [poemObj, setPoemObj] = useState(null); // for createAuthorPoem
  const [poemPrint, setPoemPrint] = useState('');
  const usedPoemsRef = useRef([]);
  const typeRef = useRef({ // track the typeText function
    timerId: null,
    typing: false
  });

  // toggle background dots in poem mode
  useEffect(() => {
    if (appMode == 'default-poem' || appMode == 'madlibs-poem') {
      document.body.classList.remove('dots');
    } else {
      document.body.classList.add('dots');
    }
  }, [appMode])

  // print poem once fetched
  useEffect(() => {
    if (poemObj) {
      typeText(poemObj.lines, typeRef, lineLimit, setPoemPrint);
    }
  }, [poemObj]);

  function handleKeyDown(e) {
    if (e.key == 'Enter') {
      switch (appMode) {
        case 'default':
          createAuthorPoem();
          break;
        case 'default-poem':
          clearTimeout(typeRef.current.timerId);
          setAppMode('default');
          break;
      }
    }
  }

  async function handleRandomClick() {
    clearTimeout(typeRef.current.timerId);
    setPoemObj(
      await getPoem(null, null, usedPoemsRef)
    );
    setAppMode('default-poem');
  }

  async function createAuthorPoem() {
    if (!userEntry.trim()) return;
    
    clearTimeout(typeRef.current.timerId);
    setPoemObj(
      await getPoem(userEntry, null, usedPoemsRef)
    );
    setAppMode('default-poem');
    setUserEntry('');
}


  if (appMode == 'default') {
    return (
      <div id='container' tabIndex={0} onKeyDown={handleKeyDown}>
        <MainHeading textContent='Poetry Machine' className='' />
        <AuthorInput userEntry={userEntry} setUserEntry={setUserEntry} />
        <p id="or-text">OR</p>
        <RandomButton handleRandomClick={handleRandomClick} appMode={appMode} />
        <ChangeModeButton typeRef={typeRef} appMode={appMode} setAppMode={setAppMode} />
        <LineLimit lineLimit={lineLimit} setLineLimit={setLineLimit} />
      </div>
    );
  } 

  if (appMode == 'default-poem') {
    return (
      <div id='container' tabIndex={0} onKeyDown={handleKeyDown}>
        <PoemTitle title={poemObj.title} />
        <p id="poetry">{poemPrint}</p>
        <ChangeModeButton typeRef={typeRef} appMode={appMode} setAppMode={setAppMode} />
        <div id="author-cont">
          <a 
            id="author-link"
            href={`https://en.wikipedia.org/wiki/${poemObj.author}`}
            target='_blank'
          >
            {poemObj.author}
          </a>
        </div>
        <LineLimit lineLimit={lineLimit} setLineLimit={setLineLimit} />
      </div>
    )
  }
  
  if (appMode == 'madlibs') {
    return (
      <div id='container' tabIndex={0}>
        <MainHeading textContent='Madlibs!' className='madlibs-text' />
        <p id="poetry"></p>
        <ChangeModeButton typeRef={typeRef} appMode={appMode} setAppMode={setAppMode} />
      </div>
    )
  }
  
}

