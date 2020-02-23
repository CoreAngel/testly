import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation';
import { routes } from 'static/routes';
import ListView from 'views/ListView';
import LoadListView from 'views/LoadListView';
import HomeView from 'views/HomeView';
import TestView from 'views/TestView';
import ResultView from 'views/ResultView';
import { MainContainer } from 'utils/style';
import { Container } from './MainView.style';

const MainView = () => {
    return (
        <Container>
            <Router>
                <MainContainer>
                    <Navigation />
                </MainContainer>
                <Switch>
                    <Route exact path={routes.Home} component={HomeView} />
                    <Route path={routes.LoadList} component={LoadListView} />
                    <Route path={`${routes.List}/:id?`} component={ListView} />
                    <Route path={routes.Test} component={TestView} />
                    <Route path={routes.Result} component={ResultView} />
                </Switch>
            </Router>
        </Container>
    );
};

export default MainView;
