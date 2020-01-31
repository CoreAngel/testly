import React, {useState} from "react";
import styled from "styled-components";
import {Input} from "reactstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Question from './Question'

const QuestionsList = ({questions}) => {
    const [searchState, setSearchState] = useState('');

    const searchedQuestions = questions.filter(item => {
        const question = item.q.toLowerCase();
        const searchText = searchState.trim().toLowerCase();
        return question.includes(searchText)
    });

    return questions.length <= 0 ?
        <Redirect to={'/'}/> :
        <>
            <SearchContainer>
                <Input onChange={({target}) => setSearchState(target.value)} value={searchState} placeholder={'Search...'} type='search'/>
            </SearchContainer>
            <div>
                {searchedQuestions.map(({index, q, a, c}) =><Question key={index} number={index + 1} question={q} answers={a} correct={c}/>)}
            </div>
        </>;
};

const SearchContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: center;
  margin-top: 20px;
`;

const mapStateToProps = (state) => {
    const { question } = state;

    return {
        questions: question
    }
};

export default connect(mapStateToProps)(QuestionsList);
