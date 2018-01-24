import React from 'react';
import Header from './Header';
import ArmorBuilder from './ArmorBuilder';
import ArmorList from './ArmorList';
import Footer from './Footer';
import '../css/App.css';

const App = () => (
  <div className="App">
    <Header />
    <ArmorBuilder />
    <ArmorList />
    <Footer />
  </div>
);

export default App;
