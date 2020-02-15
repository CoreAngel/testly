import keyCodes from 'utils/keyCodes';

const fetchFile = fileName => {
    const host = `${window.location.host}`;
    const base = `${window.location.protocol}//${host}`;
    const absoluteUrl = host.includes('localhost') ? base : `${base}/testly`;

    return fetch(`${absoluteUrl}/data/${fileName}`)
        .then(data => data.json())
        .then(({ name, key, list }) => {
            const mappedList = list.map((item, index) => {
                const correctIndex =
                    item.c
                        .trim()
                        .toLowerCase()
                        .charCodeAt(0) - keyCodes.a;
                return {
                    ...item,
                    index,
                    c: correctIndex,
                };
            });

            return {
                name,
                key,
                list: mappedList,
            };
        });
};

export default fetchFile;
