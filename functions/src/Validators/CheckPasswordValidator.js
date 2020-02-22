const { testIdSchema, passwordSchema } = require('./Schemas');
const { Validator } = require('./Validator');

const CheckPasswordValidator = obj => {
    const checkPassSchema = {
        key: testIdSchema(true),
        password: passwordSchema(true),
    };

    const errors = Validator(obj, checkPassSchema);

    if (Object.entries(errors).length !== 0) {
        return errors;
    }

    return null;
};

module.exports = {
    CheckPasswordValidator,
};
