export default async function getMadlibsPoems(lineNum) {
    const urls = Array(lineNum).fill('https://poetrydb.org/random');
    const poems = [];
  
    const controller = new AbortController();
    const signal = controller.signal;

    const timerId = setTimeout(() => controller.abort(), 5000);
    try {
        let responses = await Promise.all(urls.map( url => fetch(url, {signal}) ));
        let jsons = await Promise.all(responses.map( response => response.json() ));
        
        for (let jsonArray of jsons) {
            poems.push(jsonArray[0]);
        }
        if (jsons.length !== lineNum) throw new Error('Madlibs fetch error');
    } catch(err) {
        console.error('Fetch error: ', err);
        throw err;
        // errors caught in MadGoButton's handleClick function
    } finally {
      clearTimeout(timerId);
    }

    return poems;
}