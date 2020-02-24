import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyleWrapper from 'theme/GlobalStyleWrapper';
import MainView from 'views/MainView';
import Spinner from 'components/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={Spinner} persistor={persistor}>
                <GlobalStyleWrapper>
                    <MainView />
                </GlobalStyleWrapper>
            </PersistGate>
        </Provider>
    );
};

export default App;
