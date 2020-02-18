const KeyCodes = {
    N1: 49,
    N9: 57,
    A: 65,
    Z: 90,
    a: 97,
    z: 122,
    esc: 27,
};

export const getIndexFromKeyCode = keyCode => {
    if (keyCode >= KeyCodes.N1 && keyCode <= KeyCodes.N9) {
        return keyCode - KeyCodes.N1;
    }
    if (keyCode >= KeyCodes.a && keyCode <= KeyCodes.z) {
        return keyCode - KeyCodes.a;
    }
    if (keyCode >= KeyCodes.A && keyCode <= KeyCodes.Z) {
        return keyCode - KeyCodes.A;
    }
    return null;
};

export const getCharFromIndex = index => {
    if (index < 0) return '';

    let chars = '';
    let ind = index;

    const numberOfChars = KeyCodes.z - KeyCodes.a + 1;
    do {
        const n = ind % numberOfChars;
        chars += String.fromCharCode(KeyCodes.a + n);
        ind = Math.floor(ind / numberOfChars) - 1;
    } while (ind >= 0);

    return chars
        .split('')
        .reverse()
        .join('');
};

export default KeyCodes;
