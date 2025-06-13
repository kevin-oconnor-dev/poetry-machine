import './AuthorInput.css'
import EnterKeyPrompt from '../EnterKeyPrompt/EnterKeyPrompt'
import { useState } from 'react';

export default function AuthorInput({ userEntry, setUserEntry }) {
  const [focused, setFocused] = useState(false);

    return (
      <div id='input-container'>
        <input
          id="author-input" 
          placeholder="Enter an author..." 
          autoComplete="off"
          value={userEntry}
          onChange={e => setUserEntry(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <EnterKeyPrompt className={`input ${focused ? 'focus' : ''}`} />
     </div>
    )
}