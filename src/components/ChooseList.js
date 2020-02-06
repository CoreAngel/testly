import React from 'react';
import styled from 'styled-components';
import SelectLoader from './SelectLoader';

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

const ChooseListContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ChooseLabel = styled.label`
    display: flex;
    align-items: center;
`;

const ChooseText = styled.span`
    margin-right: 10px;
`;

export default ChooseList;
