import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Armor from './Armor';
import { getAllArmors, getArmorsByFilter } from '../utils/api';
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
      armors: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const armors = await getAllArmors();
    this.setState({
      armors,
    });
  }

  async handleChange(event) {
    const selectName = event.target.name;
    const selectValue = event.target.value;
    const armors = await getArmorsByFilter({
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
      armors,
    }));
  }

  render() {
    return (
      <div className="ArmorList">
        <section className="filter">
          <div>
            <label><FormattedMessage id="filter.class" defaultMessage="Class" /></label>
            <select name="class" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="titan"><FormattedMessage id="class.titan" defaultMessage="Titan" /></option>
              <option value="hunter"><FormattedMessage id="class.hunter" defaultMessage="Hunter" /></option>
              <option value="warlock"><FormattedMessage id="class.warlock" defaultMessage="Warlock" /></option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="filter.type" defaultMessage="Type" /></label>
            <select name="type" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="helmet"><FormattedMessage id="build.helmet" defaultMessage="Helmet" /></option>
              <option value="gauntlet"><FormattedMessage id="build.gauntlets" defaultMessage="Gauntlets" /></option>
              <option value="chest"><FormattedMessage id="build.chest" defaultMessage="Chest Armor" /></option>
              <option value="legs"><FormattedMessage id="build.legs" defaultMessage="Leg Armor" /></option>
              <option value="classitem"><FormattedMessage id="build.classArmor" defaultMessage="Class Armor" /></option>
              <option value="ghost"><FormattedMessage id="build.ghost" defaultMessage="Ghost" /></option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="filter.tier" defaultMessage="Tier" /></label>
            <select name="tier" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="legendary"><FormattedMessage id="tier.legendary" defaultMessage="Legendary" /></option>
              <option value="exotic"><FormattedMessage id="tier.exotic" defaultMessage="Exotic" /></option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /></label>
            <select name="mobility" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /></label>
            <select name="resilience" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /></label>
            <select name="recovery" onChange={this.handleChange}>
              <option value="all"><FormattedMessage id="filter.all" defaultMessage="All" /></option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </section>
        <section className="list">
          {this.state.armors.map(armor => <Armor key={armor._id} lang={this.props.lang} armor={armor} equipItem={this.props.equipItem} />)}
        </section>
      </div>
    );
  }
}

export default ArmorList;
