import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import { IntlProvider } from 'react-intl-redux';
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
import computeLocale from './utils/locale';
import messages from './utils/messages';
import './css/index.css';

// INTL
addLocaleData([...en, ...es, ...de, ...fr, ...it, ...ja, ...pl, ...ru]);
const locale = computeLocale();
const initialState = {
  intl: {
    defaultLocale: 'en',
    locale,
    messages: messages[locale],
  },
};

// REDUX
const store = createStore(
  destinyReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

// GA
ReactGA.initialize('UA-111738679-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// APP
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <App />
    </IntlProvider>
  </Provider>
  , document.getElementById('root'),
);
