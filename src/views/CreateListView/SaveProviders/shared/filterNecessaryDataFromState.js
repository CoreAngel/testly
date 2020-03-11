const filterNecessaryDataFromState = ({ name, password, type, questions }) => {
    const questionsMapped = questions.map(({ q, d, a: { answers } }) => {
        const answersMapped = answers
            .filter(({ i }) => i !== '')
            .map(({ i, c }) => (c === undefined ? { i } : { i, c }));

        return d.item === ''
            ? {
                  q: q.item,
                  a: answersMapped,
              }
            : {
                  q: q.item,
                  d: d.item,
                  a: answersMapped,
              };
    });

    return password.item === ''
        ? {
              name: name.item,
              type: type.item,
              questions: questionsMapped,
          }
        : {
              name: name.item,
              password: password.item,
              type: type.item,
              questions: questionsMapped,
          };
};

export default filterNecessaryDataFromState;
