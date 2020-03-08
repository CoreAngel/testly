export const answerType = {
    Correct: true,
    NotSure: null,
    Incorrect: false,
};

export const originType = {
    Server: 'server',
    Local: 'local',
};

export const answerTypeAsString = {
    Correct: 'Correct',
    NotSure: 'NotSure',
    Incorrect: 'Incorrect',
};

export const testType = {
    Single: 'single',
    Multi: 'multi',
};

export const testTypeItems = [
    {
        id: 0,
        label: testType.Single,
        value: testType.Single,
    },
    {
        id: 1,
        label: testType.Multi,
        value: testType.Multi,
    },
];
