import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BackButton from "./BackButton";
import SelectLoader from "./SelectLoader";
import SelectRun from "./SelectRun";
import QuestionsList from "./QuestionsList";
import TestPanel from "./TestPanel";
import ResultPanel from "./ResultPanel";
import styled from "styled-components";

const Main = () => {
    return (
        <Container>
            <InnerContainer>
                <Router>
                    <Options>
                        <BackButton/>
                        <SelectLoader/>
                        <SelectRun/>
                    </Options>
                    <Route exact path={'/'}>
                        <p>Choose questions...</p>
                    </Route>
                    <Route path={'/list'}>
                        <QuestionsList/>
                    </Route>
                    <Route path={'/test'}>
                        <TestPanel/>
                    </Route>
                    <Route path={'/result'}>
                        <ResultPanel/>
                    </Route>
                </Router>
            </InnerContainer>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: #1f1f1f;
    color: #e2e2e2;
    min-height: 100vh;
`;

const Options = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
`;

export default Main;
