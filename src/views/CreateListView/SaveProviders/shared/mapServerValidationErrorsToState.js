const fieldToErrors = field => {
    return field === undefined || field.length === 0
        ? {
              errors: [],
          }
        : {
              errors: field,
          };
};

const mapServerValidationErrorsToState = ({ name, password, type, questions }) => {
    const result = {};
    result.name = fieldToErrors(name);
    result.password = fieldToErrors(password);
    result.type = fieldToErrors(type);
    result.questions = [];

    if (questions !== undefined) {
        questions.forEach(({ position, errors: { a, q, d } }) => {
            const answers = [];
            if (a.answers !== undefined) {
                a.errors.forEach(({ position: positionAnswer, error: answerError }) => {
                    answers[positionAnswer] = answerError;
                });
            }

            result.questions[position] = {
                q: fieldToErrors(q),
                d: fieldToErrors(d),
                a: {
                    errors: a.errors === undefined ? [] : a.errors,
                    answers,
                },
            };
        });
    }
    return result;
};

export default mapServerValidationErrorsToState;
