import React from 'react';
import { androidArrowBack } from 'react-icons-kit/ionicons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconStyled } from 'utils/style';
import { Button, Label } from './BackButton.style';

const BackButton = ({ label }) => {
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    };

    return (
        <Button onClick={handleClick}>
            <IconStyled icon={androidArrowBack} size={32} />
            {label !== '' && <Label>Back</Label>}
        </Button>
    );
};

BackButton.propTypes = {
    label: PropTypes.string,
};

BackButton.defaultProps = {
    label: '',
};

export default BackButton;
