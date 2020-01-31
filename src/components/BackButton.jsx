import React from "react";
import {Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';

const BackButton = () => {
    const history = useHistory();
    const back = () => {
        history.goBack();
    };

    return <Button color='danger' onClick={back}>Back</Button>
};

export default BackButton;
