import React from 'react';
import TestViewComponent from './TestView';
import RouteProtector from './RouteProtector';

const TestView = props => (
    <RouteProtector>
        <TestViewComponent {...props} />
    </RouteProtector>
);

export default TestView;
