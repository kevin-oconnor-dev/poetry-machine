import './MadlibsLineNumSelector.css';
import { useState, useEffect } from 'react';

export default function MadlibsLineNumSelector() {
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        console.log(`New selected ID: ${selectedId}`)
    }, [selectedId])

    return (
        <>
            <div id='ml-line-num-selector'>
                <h3>Select line number</h3>
                {numbers.map( num => (
                    <button 
                    key={num} 
                    id={num} 
                    className={`ml-num-btn ${num === selectedId ? 'selected' : ''}`}
                    onClick={() => setSelectedId(num)}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </>
    )
}

const numbers = [];
for (let i = 1; i <= 8; i++) {
    numbers.push(i);
}
