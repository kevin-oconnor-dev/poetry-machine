import './LineLimit.css';
import { useState, useRef, useEffect } from 'react';

export default function LineLimit({ lineLimit, setLineLimit }) {
    const [inputOpen, setInputOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputOpen) {
            inputRef.current.focus();
        }
    }, [inputOpen])

    function handleClick(e) {
        if (e.target.tagName == 'INPUT') return;
        setInputOpen(!inputOpen);
    }

    function handleBlur() {
        setInputOpen(false);
    }

    return ( 
        <p id="max-line" onClick={handleClick}>
            {!inputOpen ? `Line Limit: ${lineLimit}` : (
                <span>
                    Line Limit:{' '} 
                    <input 
                        id='line-limit-input' 
                        type='number' 
                        value={lineLimit === 0 ? '' : lineLimit}
                        onChange={e => setLineLimit(e.target.value)}
                        ref={inputRef}
                        onBlur={handleBlur} 
                    />
                </span>
            )}
        </p>
    )
}