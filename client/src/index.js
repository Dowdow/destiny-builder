import React from 'react';
import ReactDOM from 'react-dom';
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
import './css/index.css';

addLocaleData(en);
addLocaleData(es);
addLocaleData(de);
addLocaleData(fr);
addLocaleData(it);
addLocaleData(ja);
addLocaleData(pl);
addLocaleData(ru);

ReactGA.initialize('UA-111738679-1');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(<App />, document.getElementById('root'));
