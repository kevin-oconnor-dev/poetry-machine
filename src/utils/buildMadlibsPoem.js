import getMadlibsPoems from "./getMadlibsPoems";
import pickMadlibsLines from "./pickMadlibsLines";
import typeText from "./typeText";

export default async function buildMadlibsPoem(typeRef, lineNum, setPoemPrint) {
    clearTimeout(typeRef.current.timerId);
    const poems = await getMadlibsPoems(lineNum);
    const lines = pickMadlibsLines(poems);
    typeText(lines, typeRef, null, setPoemPrint);
}