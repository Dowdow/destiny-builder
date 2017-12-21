import React, { Component } from 'react';
import Armor from './Armor';
import { getAllArmors, getArmorsByFilter } from '../api';
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
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeTier = this.handleChangeTier.bind(this);
    this.handleChangeMobility = this.handleChangeMobility.bind(this);
    this.handleChangeResilience = this.handleChangeResilience.bind(this);
    this.handleChangeRecovery = this.handleChangeRecovery.bind(this);
  }

  async componentWillMount() {
    const armors = await getAllArmors();
    this.setState({
      armors,
    });
  }

  async handleChangeClass(event) {
    const classValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: classValue,
      type: this.state.type,
      tier: this.state.tier,
      mobility: this.state.mobility,
      resilience: this.state.resilience,
      recovery: this.state.recovery,
    });
    this.setState(prevState => ({
      class: classValue,
      type: prevState.type,
      tier: prevState.tier,
      mobility: prevState.mobility,
      resilience: prevState.resilience,
      recovery: prevState.recovery,
      armors,
    }));
  }

  async handleChangeType(event) {
    const typeValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: this.state.class,
      type: typeValue,
      tier: this.state.tier,
      mobility: this.state.mobility,
      resilience: this.state.resilience,
      recovery: this.state.recovery,
    });
    this.setState(prevState => ({
      class: prevState.class,
      type: typeValue,
      tier: prevState.tier,
      mobility: prevState.mobility,
      resilience: prevState.resilience,
      recovery: prevState.recovery,
      armors,
    }));
  }

  async handleChangeTier(event) {
    const tierValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: this.state.class,
      type: this.state.type,
      tier: tierValue,
      mobility: this.state.mobility,
      resilience: this.state.resilience,
      recovery: this.state.recovery,
    });
    this.setState(prevState => ({
      class: prevState.class,
      type: prevState.type,
      tier: tierValue,
      mobility: prevState.mobility,
      resilience: prevState.resilience,
      recovery: prevState.recovery,
      armors,
    }));
  }

  async handleChangeMobility(event) {
    const mobilityValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: this.state.class,
      type: this.state.type,
      tier: this.state.tier,
      mobility: mobilityValue,
      resilience: this.state.resilience,
      recovery: this.state.recovery,
    });
    this.setState(prevState => ({
      class: prevState.class,
      type: prevState.type,
      tier: prevState.tier,
      mobility: mobilityValue,
      resilience: prevState.resilience,
      recovery: prevState.recovery,
      armors,
    }));
  }

  async handleChangeResilience(event) {
    const resilienceValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: this.state.class,
      type: this.state.type,
      tier: this.state.tier,
      mobility: this.state.mobility,
      resilience: resilienceValue,
      recovery: this.state.recovery,
    });
    this.setState(prevState => ({
      class: prevState.class,
      type: prevState.type,
      tier: prevState.tier,
      mobility: prevState.mobility,
      resilience: resilienceValue,
      recovery: prevState.recovery,
      armors,
    }));
  }

  async handleChangeRecovery(event) {
    const recoveryValue = event.target.value;
    const armors = await getArmorsByFilter({
      class: this.state.class,
      type: this.state.type,
      tier: this.state.tier,
      mobility: this.state.mobility,
      resilience: this.state.resilience,
      recovery: recoveryValue,
    });
    this.setState(prevState => ({
      class: prevState.class,
      type: prevState.type,
      tier: prevState.tier,
      mobility: prevState.mobility,
      resilience: prevState.resilience,
      recovery: recoveryValue,
      armors,
    }));
  }

  render() {
    return (
      <div className="ArmorList">
        <section className="filter">
          <div>
            <label>Class</label>
            <select onChange={this.handleChangeClass}>
              <option value="all">All</option>
              <option value="titan">Titan</option>
              <option value="hunter">Hunter</option>
              <option value="warlock">Warlock</option>
            </select>
          </div>
          <div>
            <label>Type</label>
            <select onChange={this.handleChangeType}>
              <option value="all">All</option>
              <option value="helmet">Helmet</option>
              <option value="gauntlet">Gauntlet</option>
              <option value="chest">Chest</option>
              <option value="legs">Legs</option>
              <option value="classitem">Class item</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
          <div>
            <label>Tier</label>
            <select onChange={this.handleChangeTier}>
              <option value="all">All</option>
              <option value="legendary">Legendary</option>
              <option value="exotic">Exotic</option>
            </select>
          </div>
          <div>
            <label>Mobility</label>
            <select name="mobility" onChange={this.handleChangeMobility}>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label>Resilience</label>
            <select onChange={this.handleChangeResilience}>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label>Recovery</label>
            <select onChange={this.handleChangeRecovery}>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </section>
        <section className="list">
          {this.state.armors.map(armor => <Armor key={armor._id} armor={armor} equipItem={this.props.equipItem} />)}
        </section>
      </div>
    );
  }
}

export default ArmorList;
