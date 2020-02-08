import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseList from 'components/ChooseList';
import QuestionsList from 'components/QuestionsList/QuestionsList';

const ListView = ({ questions }) => {
    return (
        <>
            <ChooseList />
            {questions.length > 0 && <QuestionsList questions={questions} />}
        </>
    );
};

ListView.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = ({ question }) => ({
    questions: question,
});

export default connect(mapStateToProps)(ListView);
