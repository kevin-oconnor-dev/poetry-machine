export default async function getPoem(author, signal, usedPoemsRef) {
    const usedPoems = usedPoemsRef.current;
    let url;
    if (!author) {
        url = `https://poetrydb.org/random`;
    } else {
        url = `https://poetrydb.org/author,random/${author};1`;
    }

    try {
        let response;
        let json;
        let jsonPoem;
        do {
            response = await fetch(url, { signal });
            json = await response.json();
            jsonPoem = json[0];
        } while (usedPoems.includes(jsonPoem.title));
        usedPoems.push(jsonPoem.title);


        if (!response.ok) {
            throw new FetchError(`Response status: ${response.status}`);
        }
        return jsonPoem;
    } catch (err) {
        if (err instanceof FetchError) {
            console.error('getPoem fetch error:', err);
        } else {
            throw err;
        }
    }
}

class FetchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FetchError';
    }
}