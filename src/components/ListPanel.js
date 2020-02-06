import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseList from './ChooseList';
import QuestionsList from './QuestionsList';

const ListPanel = ({ questions }) => {
    return (
        <>
            <ChooseList />
            {questions.length > 0 && <QuestionsList questions={questions} />}
        </>
    );
};

ListPanel.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = state => {
    const { question } = state;

    return {
        questions: question,
    };
};

export default connect(mapStateToProps)(ListPanel);
