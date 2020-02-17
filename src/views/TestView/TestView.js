import React from 'react';
import { connect } from 'react-redux';

const TestView = () => {
    return <p>lol</p>;
};

const mapStateToProps = ({ test }) => ({ test });

export default connect(mapStateToProps)(TestView);
