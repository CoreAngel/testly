import React from 'react';
import ResultViewComponent from './ResultView';
import RouteProtector from './RouteProtector';

const ResultView = props => (
    <RouteProtector>
        <ResultViewComponent {...props} />
    </RouteProtector>
);

export default ResultView;
