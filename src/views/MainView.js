import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import ListView from './ListView';
import HomeView from './HomeView';
import TestView from './TestView';
import ResultView from './ResultView';

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

const MainView = () => {
    return (
        <Container>
            <Wrapper>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={HomeView} />
                        <Route path="/list" component={ListView} />
                        <Route path="/test" component={TestView} />
                        <Route path="/result" component={ResultView} />
                    </Switch>
                </Router>
            </Wrapper>
        </Container>
    );
};

export default MainView;
