import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Armor from './Armor';
import { getAllArmors, getArmorsByFilter } from '../actions/armor';
import '../css/ArmorList.css';

class ArmorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: 'all',
      type: 'all',
      tier: 'all',
      mobility: 'all',
      resilience: 'all',
      recovery: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.getAllArmors();
  }

  async handleChange(event) {
    const selectName = event.target.name;
    const selectValue = event.target.value;
    this.props.getArmorsByFilter({
      class: selectName === 'class' ? selectValue : this.state.class,
      type: selectName === 'type' ? selectValue : this.state.type,
      tier: selectName === 'tier' ? selectValue : this.state.tier,
      mobility: selectName === 'mobility' ? selectValue : this.state.mobility,
      resilience: selectName === 'resilience' ? selectValue : this.state.resilience,
      recovery: selectName === 'recovery' ? selectValue : this.state.recovery,
    });
    this.setState(prevState => ({
      class: selectName === 'class' ? selectValue : prevState.class,
      type: selectName === 'type' ? selectValue : prevState.type,
      tier: selectName === 'tier' ? selectValue : prevState.tier,
      mobility: selectName === 'mobility' ? selectValue : prevState.mobility,
      resilience: selectName === 'resilience' ? selectValue : prevState.resilience,
      recovery: selectName === 'recovery' ? selectValue : prevState.recovery,
    }));
  }

  render() {
    return (
      <div className="ArmorList">
        <section className="filter">
          <div>
            <label htmlFor="class"><FormattedMessage id="filter.class" defaultMessage="Class" /></label>
            <select id="class" name="class" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="class.titan" defaultMessage="Titan">
                {message => <option value="titan">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="class.hunter" defaultMessage="Hunter">
                {message => <option value="hunter">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="class.warlock" defaultMessage="Warlock">
                {message => <option value="warlock">{message}</option>}
              </FormattedMessage>
            </select>
          </div>
          <div>
            <label htmlFor="type"><FormattedMessage id="filter.type" defaultMessage="Type" /></label>
            <select id="type" name="type" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.helmet" defaultMessage="Helmet">
                {message => <option value="helmet">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.gauntlets" defaultMessage="Gauntlets">
                {message => <option value="gauntlet">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.chest" defaultMessage="Chest Armor">
                {message => <option value="chest">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.legs" defaultMessage="Leg Armor">
                {message => <option value="legs">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.classArmor" defaultMessage="Class Armor">
                {message => <option value="classitem">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="build.ghost" defaultMessage="Ghost">
                {message => <option value="ghost">{message}</option>}
              </FormattedMessage>
            </select>
          </div>
          <div>
            <label htmlFor="tier"><FormattedMessage id="filter.tier" defaultMessage="Tier" /></label>
            <select id="tier" name="tier" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="tier.legendary" defaultMessage="Legendary">
                {message => <option value="legendary">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="tier.exotic" defaultMessage="Exotic">
                {message => <option value="exotic">{message}</option>}
              </FormattedMessage>
            </select>
          </div>
          <div>
            <label htmlFor="mobility"><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /></label>
            <select id="mobility" name="mobility" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label htmlFor="resilience"><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /></label>
            <select id="resilience" name="resilience" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label htmlFor="recovery"><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /></label>
            <select id="recovery" name="recovery" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </section>
        <section className="list">
          {this.props.armors.map(armor => <Armor key={armor._id} lang={this.props.lang} armor={armor} equipItem={this.props.equipItem} />)}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  console.log(state.armor);
  return {
    armors: state.armor.armors,
  };
}

export default connect(mapStateToProps, { getAllArmors, getArmorsByFilter })(ArmorList);
