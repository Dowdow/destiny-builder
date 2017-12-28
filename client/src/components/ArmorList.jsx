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
            <label>Class</label>
            <select name="class" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="titan">Titan</option>
              <option value="hunter">Hunter</option>
              <option value="warlock">Warlock</option>
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type" onChange={this.handleChange}>
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
            <select name="tier" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="legendary">Legendary</option>
              <option value="exotic">Exotic</option>
            </select>
          </div>
          <div>
            <label>Mobility</label>
            <select name="mobility" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label>Resilience</label>
            <select name="resilience" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label>Recovery</label>
            <select name="recovery" onChange={this.handleChange}>
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
