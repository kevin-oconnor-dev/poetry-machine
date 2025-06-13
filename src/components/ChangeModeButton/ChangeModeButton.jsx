import './ChangeModeButton.css';

export default function ChangeModeButton({ typeRef, appMode, setAppMode }) {
    function handleClick() {
        if (typeRef.current.typing) clearTimeout(typeRef.current.timerId);
        if (appMode == 'default' || appMode == 'default-poem') {
            setAppMode('madlibs');
        } else {
            setAppMode('default');
        }
    }
    let buttonLabel = '';
    if (appMode == 'default' || appMode == 'default-poem') {
        buttonLabel = 'Madlibs!';
    } else {
        buttonLabel = 'Traditional'
    }

    return (
        <button id="madlibs-btn" onClick={handleClick}>{buttonLabel}</button>
    )
}