import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Header from './Header';
import ArmorBuilder from './ArmorBuilder';
import ArmorList from './ArmorList';
import Footer from './Footer';
import messages from '../utils/messages';
import '../css/App.css';

const App = props => (
  <IntlProvider locale={props.lang} messages={messages[props.lang]}>
    <div className="App">
      <Header />
      <ArmorBuilder />
      <ArmorList />
      <Footer />
    </div>
  </IntlProvider>
);

function mapStateToProps(state) {
  console.log(state);
  return {
    lang: state.language,
  };
}

export default connect(mapStateToProps)(App);
