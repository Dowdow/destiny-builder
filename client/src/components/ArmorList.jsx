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
      armors: [],
    };
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeTier = this.handleChangeTier.bind(this);
  }

  async componentWillMount() {
    const armors = await getAllArmors();
    this.setState({
      armors,
    });
  }

  async handleChangeClass(event) {
    const classObj = event.target.value;
    const armors = await getArmorsByFilter(classObj, this.state.type, this.state.tier);
    this.setState(prevState => ({
      class: classObj,
      type: prevState.type,
      tier: prevState.tier,
      armors,
    }));
  }

  async handleChangeType(event) {
    const typeObj = event.target.value;
    const armors = await getArmorsByFilter(this.state.class, typeObj, this.state.tier);
    this.setState(prevState => ({
      class: prevState.class,
      type: typeObj,
      tier: prevState.tier,
      armors,
    }));
  }

  async handleChangeTier(event) {
    const tierObj = event.target.value;
    const armors = await getArmorsByFilter(this.state.class, this.state.type, tierObj);
    this.setState(prevState => ({
      class: prevState.class,
      type: prevState.type,
      tier: tierObj,
      armors,
    }));
  }

  render() {
    return (
      <div>
        <h1>Armors</h1>
        <label>Class</label>
        <select onChange={this.handleChangeClass}>
          <option value="all">All</option>
          <option value="titan">Titan</option>
          <option value="hunter">Hunter</option>
          <option value="warlock">Warlock</option>
        </select>
        <label>Type</label>
        <select onChange={this.handleChangeType}>
          <option value="all">All</option>
          <option value="helmet">Helmet</option>
          <option value="shoulder">Shoulder</option>
          <option value="chest">Chest</option>
          <option value="legs">Legs</option>
          <option value="classitem">Class item</option>
          <option value="ghost">Ghost</option>
        </select>
        <label>Tier</label>
        <select onChange={this.handleChangeTier}>
          <option value="all">All</option>
          <option value="legendary">Legendary</option>
          <option value="exotic">Exotic</option>
        </select>
        <div className="ArmorList">
          {this.state.armors.map(armor => <Armor key={armor._id} {...armor} />)}
        </div>
      </div>
    );
  }
}

export default ArmorList;
