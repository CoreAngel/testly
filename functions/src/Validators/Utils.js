const mustBeType = (value, type) => {
    if (type === 'array') {
        return Array.isArray(value);
    }
    return typeof value === type;
};

const mustBeMin = (value, size) => {
    return value.length >= size;
};

const mustBeMax = (value, size) => {
    return value.length <= size;
};

const mustBeNotEmpty = value => {
    return value.length !== 0;
};

const mustBeBetween = (value, min, max) => {
    return value.length >= min && value.length <= max;
};

const mustBeInRange = (value, min, max) => {
    return value >= min && value <= max;
};

const mustBeOneOf = (value, types) => {
    return types.some(item => item === value);
};

const isSet = value => {
    return value !== undefined;
};

const mustBeAlphanum = (value, space = false) => {
    const regex = /^[0-9a-zA-Z]+$/;
    const regexWithSpace = /^[0-9a-zA-Z ]+$/;
    return value.match(space ? regexWithSpace : regex) !== null;
};

module.exports = {
    mustBeType,
    mustBeMin,
    mustBeMax,
    mustBeOneOf,
    isSet,
    mustBeBetween,
    mustBeInRange,
    mustBeAlphanum,
    mustBeNotEmpty,
};
