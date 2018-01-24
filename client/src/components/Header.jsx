import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import changeLocale from '../actions/locale';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
  }

  handleChangeLocale(locale) {
    this.props.changeLocale(locale);
  }

  renderButtonLocale(locale) {
    return (
      <button className={this.props.locale === locale ? 'selected' : ''} onClick={() => this.handleChangeLocale(locale)}>{locale}</button>
    );
  }

  render() {
    return (
      <header>
        <h1><FormattedMessage id="nav.title" defaultMessage="Destiny 2 Build Generator" /></h1>
        <div>
          {this.renderButtonLocale('de')}
          {this.renderButtonLocale('en')}
          {this.renderButtonLocale('es')}
          {this.renderButtonLocale('fr')}
          {this.renderButtonLocale('it')}
          {this.renderButtonLocale('ja')}
          {this.renderButtonLocale('pl')}
          {this.renderButtonLocale('ru')}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: state.intlReducer.locale,
  };
}

export default connect(mapStateToProps, { changeLocale })(Header);
