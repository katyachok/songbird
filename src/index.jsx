import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => {
  return <div>Hello</div>;
};

const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('app');
ReactDom.render(<AppWithHot></AppWithHot>, mountNode);
