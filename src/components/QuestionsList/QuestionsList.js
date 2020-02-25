import React, { useState } from 'react';
import Question from 'components/Question';
import TextInput from 'components/TextInput';
import { listQuestionsProps } from 'utils/propTypes';
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
                <TextInput
                    onChange={({ target }) => setSearchState(target.value)}
                    value={searchState}
                    placeholder="Search..."
                    type="search"
                />
            </SearchContainer>
            <div>
                {searchedQuestions.map(({ id, q, d, a }) => (
                    <Question key={id} number={id + 1} question={q} description={d} answers={a} />
                ))}
            </div>
        </>
    );
};

QuestionsList.propTypes = {
    questions: listQuestionsProps.isRequired,
};

export default QuestionsList;
