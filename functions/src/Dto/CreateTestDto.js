const CreateTestDto = ({ name, type, password, questions }) => {
    const checkedQuestions = questions.map(({ q, a, d }) => {
        const answers = a.map(({ i, c }) => (c !== undefined ? { i, c } : { i }));
        return d !== undefined ? { q, d, a: answers } : { q, a: answers };
    });
    return password !== undefined
        ? { name, type, password, questions: checkedQuestions }
        : { name, type, questions: questions };
};

module.exports = {
    CreateTestDto,
};
