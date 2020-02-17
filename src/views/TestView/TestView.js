import React, { useState } from 'react';
import { connect } from 'react-redux';
import { testProps } from '../../utils/propTypes';
import TestHeader from '../../components/TestHeader';

const TestView = ({ test: { index, name, key, list } }) => {
    const [position, setPosition] = useState(index);

    return (
        <TestHeader
            index={index}
            position={position}
            setPosition={setPosition}
            listLength={list.length}
            testKey={key}
            name={name}
        />
    );
};

TestView.propTypes = {
    test: testProps.isRequired,
};

const mapStateToProps = ({ test }) => ({ test });

export default connect(mapStateToProps)(TestView);
