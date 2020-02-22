const CreateTestDto = ({ name, type, password, list }) => {
    const questions = list.map(({ q, a, d }) => {
        const answers = a.map(({ i, c }) => (c !== undefined ? { i, c } : { i }));
        return d !== undefined ? { q, d, a: answers } : { q, a: answers };
    });
    return password !== undefined ? { name, type, password, list: questions } : { name, type, list: questions };
};

module.exports = {
    CreateTestDto,
};
