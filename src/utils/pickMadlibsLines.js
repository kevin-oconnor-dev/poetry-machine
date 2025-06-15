export default function pickMadlibsLines(madPoems) {
    const assembledLines = [];

    for (let i = 0; i < madPoems.length; i++) {
        let poemObj = madPoems[i];
        const lineCount = poemObj.lines.length;
        console.log('line count: ' + lineCount);
        let random = null;
        let pickedLine = '';
        if (i === 0 || i === madPoems.length - 1) {
            do {
                random = Math.floor(Math.random() * lineCount);
                console.log(`random (first or last): ${random}`);
                pickedLine = poemObj.lines[random - 1];
            } while (pickedLine === '' || pickedLine.length === 1);
        } else { 
            do { 
                random = Math.floor(Math.random() * lineCount);
                console.log(`random: ${random}`);
                pickedLine = poemObj.lines[random - 1];
            } while ( pickedLine.length === 1); // allow line breaks between first and last lines
        }
        console.log(`picked line ${i + 1}: ${pickedLine}`);
        assembledLines.push(pickedLine);
    }  
    console.log('madlibs lines: ', assembledLines);
    return assembledLines;
}