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
            <label><FormattedMessage id="filter.type" defaultMessage="Type" /></label>
            <select name="type" onChange={this.handleChange}>
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
            <label><FormattedMessage id="filter.tier" defaultMessage="Tier" /></label>
            <select name="tier" onChange={this.handleChange}>
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
            <label><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /></label>
            <select name="mobility" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /></label>
            <select name="resilience" onChange={this.handleChange}>
              <FormattedMessage id="filter.all" defaultMessage="All">
                {message => <option value="all">{message}</option>}
              </FormattedMessage>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /></label>
            <select name="recovery" onChange={this.handleChange}>
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
          {this.state.armors.map(armor => <Armor key={armor._id} lang={this.props.lang} armor={armor} equipItem={this.props.equipItem} />)}
        </section>
      </div>
    );
  }
}

export default ArmorList;
