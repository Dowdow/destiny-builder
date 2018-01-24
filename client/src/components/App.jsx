import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import ArmorBuilder from './ArmorBuilder';
import ArmorList from './ArmorList';
import Footer from './Footer';
import '../css/App.css';

const App = props => (
  <div className="App">
    <Header locale={props.locale} />
    <ArmorBuilder locale={props.locale} />
    <ArmorList locale={props.locale} />
    <Footer />
  </div>
);

function mapStateToProps(state) {
  return {
    locale: state.intl.locale,
  };
}

export default connect(mapStateToProps)(App);
