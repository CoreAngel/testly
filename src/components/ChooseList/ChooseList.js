import React from 'react';
import { ChooseLabel, ChooseListContainer, ChooseText } from './ChooseList.style';
import SelectLoader from '../SelectLoader/SelectLoader';

const ChooseList = () => {
    return (
        <ChooseListContainer>
            <ChooseLabel>
                <ChooseText>Choose internal list:</ChooseText>
                <SelectLoader />
            </ChooseLabel>
        </ChooseListContainer>
    );
};

export default ChooseList;
