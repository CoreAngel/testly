const Validator = (data, schema) => {
    const errors = {};

    for (let key in schema) {
        if (!Object.prototype.hasOwnProperty.call(schema, key)) {
            continue;
        }

        const item = data[key];
        const validationFun = schema[key];

        const itemErrors = validationFun(item);
        if (Object.keys(itemErrors).length > 0) {
            errors[key] = itemErrors;
        }
    }

    return errors;
};

module.exports = {
    Validator,
};
