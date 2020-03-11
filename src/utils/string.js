export const getRandomString = (length = 15) => {
    let string = '';

    do {
        string += Math.random()
            .toString(36)
            .substring(2, 15);
    } while (string.length < length);

    return string.substr(0, length);
};
