import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';
import ja from 'react-intl/locale-data/ja';
import pl from 'react-intl/locale-data/pl';
import ru from 'react-intl/locale-data/ru';
import ReactGA from 'react-ga';
import App from './components/App';
import destinyReducer from './reducers/index';
import './css/index.css';

// REDUX
const store = createStore(
  destinyReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

// INTL
addLocaleData([...en, ...es, ...de, ...fr, ...it, ...ja, ...pl, ...ru]);

// GA
ReactGA.initialize('UA-111738679-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// APP
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'),
);
