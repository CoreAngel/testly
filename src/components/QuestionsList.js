import React, {useState} from "react";
import styled from "styled-components";
import {Input} from "reactstrap";
import Question from './Question'

const QuestionsList = ({questions}) => {
    const [searchState, setSearchState] = useState('');

    const searchedQuestions = questions.filter(item => {
        const question = item.q.toLowerCase();
        const searchText = searchState.trim().toLowerCase();
        return question.includes(searchText)
    });

    return (
        <>
            <SearchContainer>
                <Input onChange={({target}) => setSearchState(target.value)} value={searchState} type='search'/>
            </SearchContainer>
            <div>
                {searchedQuestions.map((item, index) =><Question key={index} number={index + 1} question={item.q} answers={item.a} correct={item.c}/>)}
            </div>
        </>
    )
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export default QuestionsList;
