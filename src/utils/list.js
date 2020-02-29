import { answerType, answerTypeAsString } from 'static/list';

const answerTypeToType = (fromType, toType) => {
    return type => {
        const keys = Object.keys(fromType);
        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            if (fromType[key] === type) {
                return toType[key];
            }
        }
        return toType.Incorrect;
    };
};

export const answerTypeToStringType = answerTypeToType(answerType, answerTypeAsString);

export const answerStringTypeToType = answerTypeToType(answerTypeAsString, answerType);
