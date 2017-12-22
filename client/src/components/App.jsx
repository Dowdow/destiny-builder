import React, { Component } from 'react';
import ArmorList from './ArmorList';
import '../css/App.css';
import ArmorBuilder from './ArmorBuilder';

const TYPE_HELMET = '3448274439';
const TYPE_GAUNTLET = '3551918588';
const TYPE_CHEST = '14239492';
const TYPE_LEG = '20886954';
const TYPE_CLASS_ITEM = '1585787867';
const TYPE_GHOST = '4023194814';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helmet: null,
      gauntlet: null,
      chest: null,
      legs: null,
      classArmor: null,
      mobility: 0,
      resilience: 0,
      recovery: 0,
    };
    this.handleEquipItem = this.handleEquipItem.bind(this);
    this.handleUnequipItem = this.handleUnequipItem.bind(this);
  }

  handleEquipItem(item) {
    this.setState(prevState => ({
      helmet: item.bucket.hash === TYPE_HELMET ? item : prevState.helmet,
      gauntlet: item.bucket.hash === TYPE_GAUNTLET ? item : prevState.gauntlet,
      chest: item.bucket.hash === TYPE_CHEST ? item : prevState.chest,
      legs: item.bucket.hash === TYPE_LEG ? item : prevState.legs,
      classArmor: item.bucket.hash === TYPE_CLASS_ITEM ? item : prevState.classArmor,
      mobility: prevState.mobility + item.mobility,
      resilience: prevState.resilience + item.resilience,
      recovery: prevState.recovery + item.recovery,
    }));
  }

  handleUnequipItem(item) {
    this.setState(prevState => ({
      helmet: item.bucket.hash === TYPE_HELMET ? null : prevState.helmet,
      gauntlet: item.bucket.hash === TYPE_GAUNTLET ? null : prevState.gauntlet,
      chest: item.bucket.hash === TYPE_CHEST ? null : prevState.chest,
      legs: item.bucket.hash === TYPE_LEG ? null : prevState.legs,
      classArmor: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmor,
      mobility: prevState.mobility - item.mobility,
      resilience: prevState.resilience - item.resilience,
      recovery: prevState.recovery - item.recovery,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Destiny 2 Build Generator</h1>
        <ArmorBuilder build={this.state} unequipItem={this.handleUnequipItem} />
        <ArmorList equipItem={this.handleEquipItem} />
      </div>
    );
  }
}

export default App;
