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

  renderButtonLanguage(lang) {
    return (
      <button className={this.props.lang === lang ? 'selected' : ''} onClick={() => this.handleChangeLanguage(lang)}>{lang}</button>
    );
  }

  render() {
    return (
      <header>
        <h1><FormattedMessage id="nav.title" defaultMessage="Destiny 2 Build Generator" /></h1>
        <div>
          {this.renderButtonLanguage('de')}
          {this.renderButtonLanguage('en')}
          {this.renderButtonLanguage('es')}
          {this.renderButtonLanguage('fr')}
          {this.renderButtonLanguage('it')}
          {this.renderButtonLanguage('ja')}
          {this.renderButtonLanguage('pl')}
          {this.renderButtonLanguage('ru')}
        </div>
      </header>
    );
  }
}

export default Header;
