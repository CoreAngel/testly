const getBaseUrl = () => {
    const { host } = window.location;
    if (host.includes('localhost')) {
        return 'http://localhost:5001/testly-f2db7/us-central1/api';
    }
    return 'http://localhost:5001/testly-f2db7/us-central1/api';
};

export const getList = key => {
    return fetch(`${getBaseUrl()}/tests/${key}`);
};

export const getAddList = key => {
    return fetch(`${getBaseUrl()}/tests/${key}/name`);
};
