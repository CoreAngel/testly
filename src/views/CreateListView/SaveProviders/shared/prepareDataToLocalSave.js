import { getRandomString } from 'utils/string';

const prepareDataToLocalSave = (test, keys) => {
    let key = '';
    let isKeyExist;

    do {
        key = getRandomString(20);
        // eslint-disable-next-line no-loop-func
        isKeyExist = keys.some(item => item.key === key);
    } while (isKeyExist);

    const questionsWithId = test.questions.map((question, index) => ({
        ...question,
        id: index,
    }));
    return {
        ...test,
        key,
        questions: questionsWithId,
    };
};

export default prepareDataToLocalSave;
