import './App.css';
import AuthorInput from './components/AuthorInput/AuthorInput';
import ChangeModeButton from './components/ChangeModeButton/ChangeModeButton';
import MainHeading from './components/MainHeading/MainHeading';
import RandomButton from './components/RandomButton/RandomButton';
import PoemTitle from './components/PoemTitle/PoemTitle'
import LineLimit from './components/LineLimit/LineLimit';
import EnterKeyPrompt from './components/EnterKeyPrompt/EnterKeyPrompt';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MadWidgets from './components/MadWidgets/MadWidgets';
import getPoem from './utils/getPoem';
import typeText from './utils/typeText';
import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [appMode, setAppMode] = useState('default');
  const [userEntry, setUserEntry] = useState('');
  const [lineLimit, setLineLimit] = useState(0);
  const [poemObj, setPoemObj] = useState(null); // for createAuthorPoem
  const [poemPrint, setPoemPrint] = useState('');
  const [fetchError, setFetchError] = useState(false);
  const usedPoemsRef = useRef([]);
  const typeRef = useRef({ // track the typeText function
    timerId: null,
    typing: false
  });

  // toggle background dots in poem mode
  useEffect(() => {
    if (appMode == 'default-poem' || appMode == 'madlibs-poem' || appMode == 'loading') {
      document.body.classList.remove('dots');
    } else {
      document.body.classList.add('dots');
    }
  }, [appMode])

  // global listener for keydown 'Enter'
  useEffect(() => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appMode, userEntry]);

  async function createAuthorPoem() {
    if (!userEntry.trim()) return;
    
    clearTimeout(typeRef.current.timerId);
    setAppMode('loading');
    let nextPoemObj = null;
    try {
      nextPoemObj = await getPoem(userEntry, null, usedPoemsRef);
    } catch(err) {
      setAppMode('default');
      console.error('Fetch Error: ', err);
      return;
    }
    setPoemObj(nextPoemObj);
    typeText(nextPoemObj.lines, typeRef, lineLimit, setPoemPrint);
    
    setAppMode('default-poem');
    setUserEntry('');
  }

  async function handleRandomClick() {
    clearTimeout(typeRef.current.timerId);
    setAppMode('loading');

    let nextPoemObj = null;
    try {
      nextPoemObj = await getPoem(null, null, usedPoemsRef);
      typeText(nextPoemObj.lines, typeRef, lineLimit, setPoemPrint);
    } catch(err) {
      setAppMode('default');
      console.error('Fetch Error: ', err);
      setFetchError(true)
      setTimeout(() => {
        setFetchError(false)
      }, 3000)
      return;
    }
    setPoemObj(nextPoemObj);
    setAppMode('default-poem');
  }

  if (appMode == 'default') {
    return (
      <div id='container'>
        <MainHeading textContent='Poetry Machine' className='' />
        <AuthorInput userEntry={userEntry} setUserEntry={setUserEntry} />
        <p id="or-text">OR</p>
        <RandomButton handleRandomClick={handleRandomClick} appMode={appMode} />
        <ChangeModeButton typeRef={typeRef} appMode={appMode} setAppMode={setAppMode} />
        <LineLimit lineLimit={lineLimit} setLineLimit={setLineLimit} />
        {fetchError && <ErrorMessage />}
      </div>
    );
  } 

  if (appMode == 'default-poem') {
    return (
      <div id='container'>
        <PoemTitle title={poemObj.title} />
        <p id="poetry">{poemPrint}</p>
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
        <div id='enter-key-poem'>
          <span>Exit</span>
          <EnterKeyPrompt className='poem' />
        </div>
      </div>
    )
  }
  
  if (appMode == 'madlibs') {
    return (
      <div id='container' className='madlibs'>
        <MainHeading textContent='Madlibs!' className='madlibs-text' />
        <p id="poetry"></p>
        <MadWidgets setFetchError={setFetchError} typeRef={typeRef} />
        <ChangeModeButton typeRef={typeRef} appMode={appMode} setAppMode={setAppMode} />
        {fetchError && <ErrorMessage />}
      </div>
    )
  }

  if (appMode == 'madlibs-poem') {
    return (
      <div id='container'>
        <p id="poetry">{poemPrint}</p>
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
        <div id='enter-key-poem'>
          <span>Exit</span>
          <EnterKeyPrompt className='poem' />
        </div>
      </div>
    )
  }

  if (appMode == 'loading') {
    return (
      <div id='loading-container'>
        <svg className='loading-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect className="load-bar load-group1" x="1" y="6" width="2.8" height="12" />
          <rect className="load-bar load-group2" x="5.8" y="6" width="2.8" height="12" />
          <rect className="load-bar" x="10.6" y="6" width="2.8" height="12" />
          <rect className="load-bar load-group2" x="15.4" y="6" width="2.8" height="12" />
          <rect className="load-bar load-group1" x="20.2" y="6" width="2.8" height="12" />
        </svg>
      </div>
    )
  }
}