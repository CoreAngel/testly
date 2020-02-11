import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { GlobalStyle } from 'theme/GlobalStyle';
import MainView from 'views/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <MainView />
        </Provider>
    );
};

export default App;
