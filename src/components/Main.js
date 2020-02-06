import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import ListPanel from './ListPanel';
import Home from './Home';
import TestPanel from './TestPanel';
import ResultPanel from './ResultPanel';

const Main = () => {
    return (
        <Container>
            <InnerContainer>
                <Router>
                    <Navigation />
                    <Route exact path="/" component={Home} />
                    <Route path="/list" component={ListPanel} />
                    <Route path="/test" component={TestPanel} />
                    <Route path="/result" component={ResultPanel} />
                </Router>
            </InnerContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: #1f1f1f;
    color: #e2e2e2;
    min-height: 100vh;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
`;

export default Main;
