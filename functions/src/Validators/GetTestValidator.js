const { testIdSchema } = require('./Schemas');
const { Validator } = require('./Validator');

const GetTestValidator = obj => {
    const idSchema = {
        key: testIdSchema(true),
    };

    const errors = Validator(obj, idSchema);

    if (Object.entries(errors).length !== 0) {
        return errors;
    }

    return null;
};

module.exports = {
    GetTestValidator,
};
