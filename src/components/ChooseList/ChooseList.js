import React from 'react';
import SelectLoader from 'components/SelectLoader';
import { ChooseLabel, ChooseListContainer, ChooseText } from './ChooseList.style';

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
