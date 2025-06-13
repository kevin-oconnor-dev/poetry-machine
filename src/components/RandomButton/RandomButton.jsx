import { useState } from 'react';
export default function RandomButton({ handleRandomClick, appMode }) {
    const [showRandomButton, setShowRandomButton] = useState(true);
    
    async function handleClick() {
        setShowRandomButton(false);
        await handleRandomClick();
        setShowRandomButton(true);
    }

    return (
        <>
            {showRandomButton && appMode == 'default' && (
                <button id="random-btn" onClick={handleClick}>Get a random poem!</button>
            )}
        </>
    )
}