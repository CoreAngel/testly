import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { Container, Wrapper } from './MainView.style';
import ListView from '../ListView';
import HomeView from '../HomeView';
import TestView from '../TestView';
import ResultView from '../ResultView';

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
