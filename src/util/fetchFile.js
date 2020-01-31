const fetchFile = (fileName) => {
    const host = `${window.location.host}`;
    const base = `${window.location.protocol}//${host}`;
    const absoluteUrl = host.includes('localhost') ? base : `${base}/testly`;

    return fetch(`${absoluteUrl}/data/${fileName}`)
        .then(data => data.json())
        .then(data => data.map((item, index) => {
            const correctIndex = item.c.trim().toLowerCase().charCodeAt(0) - 97;
            return {
                ...item,
                index,
                c: correctIndex
            }
        }))
};

export default fetchFile;
