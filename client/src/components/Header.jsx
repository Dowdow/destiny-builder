import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  handleChangeLanguage(lang) {
    this.props.changeLanguage(lang);
  }

  render() {
    return (
      <header>
        <h1><FormattedMessage id="nav.title" defaultMessage="Destiny 2 Build Generator" /></h1>
        <div>
          <button onClick={() => this.handleChangeLanguage('de')}>DE</button>
          <button onClick={() => this.handleChangeLanguage('en')}>EN</button>
          <button onClick={() => this.handleChangeLanguage('es')}>ES</button>
          <button onClick={() => this.handleChangeLanguage('fr')}>FR</button>
          <button onClick={() => this.handleChangeLanguage('it')}>IT</button>
          <button onClick={() => this.handleChangeLanguage('ja')}>JA</button>
          <button onClick={() => this.handleChangeLanguage('pl')}>PL</button>
          <button onClick={() => this.handleChangeLanguage('ru')}>RU</button>
        </div>
      </header>
    );
  }
}

export default Header;
