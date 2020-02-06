export const runTypes = {
    Q_ORDERED_A_ORDERED: 'Q_ORDERED_A_ORDERED',
    Q_ORDERED_A_RANDOM: 'Q_ORDERED_A_RANDOM',
    Q_RANDOM_A_ORDERED: 'Q_RANDOM_A_ORDERED',
    Q_RANDOM_A_RANDOM: 'Q_RANDOM_A_RANDOM',
};

export const runItems = [
    {
        id: 0,
        label: 'Questions Ordered - Answers Ordered',
        value: runTypes.Q_ORDERED_A_ORDERED,
    },
    {
        id: 1,
        label: 'Questions Ordered - Answers Random',
        value: runTypes.Q_ORDERED_A_RANDOM,
    },
    {
        id: 2,
        label: 'Questions Random - Answers Ordered',
        value: runTypes.Q_RANDOM_A_ORDERED,
    },
    {
        id: 3,
        label: 'Questions Random - Answers Random',
        value: runTypes.Q_RANDOM_A_RANDOM,
    },
];
