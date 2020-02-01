import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import store from './redux/store'
import SelectLoader from './components/SelectLoader'
import SelectRun from './components/SelectRun'
import QuestionsList from "./components/QuestionsList";
import TestPanel from "./components/TestPanel";
import ResultPanel from "./components/ResultPanel";
import BackButton from "./components/BackButton";

const App = () => {
  return (
      <Provider store={store}>
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
      </Provider>
  );
}

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

export default App;
