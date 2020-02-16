const fetchFile = fileName => {
    const host = `${window.location.host}`;
    const base = `${window.location.protocol}//${host}`;
    const absoluteUrl = host.includes('localhost') ? base : `${base}/testly`;

    return fetch(`${absoluteUrl}/data/${fileName}`).then(data => data.json());
};

export default fetchFile;
