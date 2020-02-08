import React, { useState } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { SearchContainer } from './QuestionsList.style';
import Question from '../Question';

const QuestionsList = ({ questions }) => {
    const [searchState, setSearchState] = useState('');

    const searchedQuestions = questions.filter(item => {
        const question = item.q.toLowerCase();
        const searchText = searchState.trim().toLowerCase();
        return question.includes(searchText);
    });

    return (
        <>
            <SearchContainer>
                <Input
                    onChange={({ target }) => setSearchState(target.value)}
                    value={searchState}
                    placeholder="Search..."
                    type="search"
                />
            </SearchContainer>
            <div>
                {searchedQuestions.map(({ index, q, a, c }) => (
                    <Question key={index} number={index + 1} question={q} answers={a} correct={c} />
                ))}
            </div>
        </>
    );
};

QuestionsList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default QuestionsList;
