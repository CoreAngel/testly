import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import ListPanel from './ListPanel';
import Home from './Home';
import TestPanel from './TestPanel';
import ResultPanel from './ResultPanel';

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: #1f1f1f;
    color: #e2e2e2;
    min-height: 100vh;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
`;

const Main = () => {
    return (
        <Container>
            <Wrapper>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/list" component={ListPanel} />
                        <Route path="/test" component={TestPanel} />
                        <Route path="/result" component={ResultPanel} />
                    </Switch>
                </Router>
            </Wrapper>
        </Container>
    );
};

export default Main;
