export default function typeText(poemLines, typeRef, lineLimit, setPoemPrint) {
    let print = '';
    let lineIndex = 0;
    let charIndex = 0;
    let linesActual = 0; // line count excluding blanks
    let variedSpeed = Math.floor(Math.random() * (60 - 50 + 1) + 50);

    if (!lineLimit) lineLimit = 999;
    
    function type() {
        if (lineIndex < poemLines.length && linesActual < lineLimit) {
            typeRef.current.typing = true;
            if (charIndex < poemLines[lineIndex].length) {
                print += poemLines[lineIndex][charIndex];
                charIndex++;
            } 
            else if (poemLines[lineIndex] === "") { // if line is blank, don't pause after it
                print += '\n';
                charIndex = 0;
                lineIndex++;
            } else {
                print += '\n';
                charIndex = 0;
                lineIndex++;
                linesActual++; // only lines with text count toward linesActual
                variedSpeed = 300; // pause after each line
            }
            setPoemPrint(print);

            typeRef.current.timerId = setTimeout(type, variedSpeed);
            variedSpeed = Math.floor(Math.random() * (60 - 50 + 1) + 50);
        }
    }
    type();
    typeRef.current.typing = false;
}