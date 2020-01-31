import React, {useState} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import store from './redux/store'
import SelectLoader from './components/SelectLoader'
import SelectRun, {runTypes} from './components/SelectRun'
import QuestionsList from "./components/QuestionsList";
import TestPanel from "./components/TestPanel";
import EndPanel from "./components/EndPanel";
import {shuffle} from "./util/array";
import BackButton from "./components/BackButton";

function App() {
  const [questions, setQuestions] = useState(null);
  const [testQuestions, setTestQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endTest, setEndTest] = useState(false);

  const runTest = (runType) => {
    if (questions == null) {
      return;
    }

    let testQuestions = questions.map(item => {
      const {index, q, a, c} = item;
      return {
        index,
        q,
        a: a.map((aItem, aIndex) => ({
          a: aItem,
          c: aIndex === c
        })),
        fails: 0
      }
    });

    if (runType === runTypes.Q_RANDOM_A_ORDERED || runType === runTypes.Q_RANDOM_A_RANDOM) {
      testQuestions = shuffle(testQuestions);
    } else {
      testQuestions = [...testQuestions];
    }

    if (runType === runTypes.Q_ORDERED_A_RANDOM || runType === runTypes.Q_RANDOM_A_RANDOM) {
      testQuestions = testQuestions.map(item => {
        return {
          ...item,
          a: shuffle(item.a)
        }
      })
    }

    testQuestions = testQuestions.map(item => {
      const aCorrectIndex = item.a.findIndex(aItem => aItem.c);
      return {
        ...item,
        a: item.a.map(aItem => aItem.a),
        c: aCorrectIndex
      }
    });

    setEndTest(false);
    setCurrentQuestion(0);
    setTestQuestions(testQuestions);
  };

  const backFun = () => {
    setTestQuestions(null);
    setEndTest(false);
  };

  return (
      <Provider store={store}>
        <Container>
          <InnerContainer>
            <Router>
              <Options>
                <BackButton/>
                <SelectLoader setQuestions={setQuestions}/>
                <SelectRun runTest={runTest}/>
              </Options>
              <Route exact path={'/'}>
                <p>Choose questions...</p>
              </Route>
              <Route exact path={'/list'}>
                <QuestionsList/>
              </Route>
              <Route path={'/test'}>
                <TestPanel
                    testQuestions={testQuestions}
                    setTestQuestions={setTestQuestions}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    setEndTest={setEndTest}
                />
              </Route>
              <Route path={'/result'}>
                <EndPanel testQuestions={testQuestions}/>
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
