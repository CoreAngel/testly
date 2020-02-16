import React, { useState } from 'react';
import { Input } from 'reactstrap';
import Question from 'components/Question';
import { listQuestionListProps } from 'utils/propTypes';
import { SearchContainer } from './QuestionsList.style';

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
                {searchedQuestions.map(({ id, q, a }) => (
                    <Question key={id} number={id + 1} question={q} answers={a} />
                ))}
            </div>
        </>
    );
};

QuestionsList.propTypes = {
    questions: listQuestionListProps.isRequired,
};

export default QuestionsList;
