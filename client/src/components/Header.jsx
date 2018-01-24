import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import changeLocale from '../actions/locale';
import { LOCALES_SUPPORTED } from '../utils/locale';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
  }

  handleChangeLocale(locale) {
    this.props.changeLocale(locale);
  }

  render() {
    return (
      <header>
        <h1><FormattedMessage id="nav.title" defaultMessage="Destiny 2 Build Generator" /></h1>
        <div>
          {LOCALES_SUPPORTED.map(locale => <button key={locale} className={this.props.locale === locale ? 'selected' : ''} onClick={() => this.handleChangeLocale(locale)}>{locale}</button>)}
        </div>
      </header>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { changeLocale })(Header);
