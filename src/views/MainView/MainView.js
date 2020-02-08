import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation';
import ListView from 'views/ListView';
import HomeView from 'views/HomeView';
import TestView from 'views/TestView';
import ResultView from 'views/ResultView';
import { Container, Wrapper } from './MainView.style';

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
