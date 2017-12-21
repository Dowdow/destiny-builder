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
    }));
    this.rebuildStats();
  }

  handleUnequipItem(item) {
    this.setState(prevState => ({
      helmet: item.bucket.hash === TYPE_HELMET ? null : prevState.helmet,
      gauntlet: item.bucket.hash === TYPE_GAUNTLET ? null : prevState.gauntlet,
      chest: item.bucket.hash === TYPE_CHEST ? null : prevState.chest,
      legs: item.bucket.hash === TYPE_LEG ? null : prevState.legs,
      classArmor: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmor,
    }));
    this.rebuildStats();
  }

  rebuildStats() {
    let mobility = 0;
    let resilience = 0;
    let recovery = 0;
    if (this.state.helmet !== null) {
      mobility += this.state.helmet.mobility;
      resilience += this.state.helmet.resilience;
      recovery += this.state.helmet.recovery;
    }
    if (this.state.gauntlet !== null) {
      mobility += this.state.gauntlet.mobility;
      resilience += this.state.gauntlet.resilience;
      recovery += this.state.gauntlet.recovery;
    }
    if (this.state.chest !== null) {
      mobility += this.state.chest.mobility;
      resilience += this.state.chest.resilience;
      recovery += this.state.chest.recovery;
    }
    if (this.state.legs !== null) {
      mobility += this.state.legs.mobility;
      resilience += this.state.legs.resilience;
      recovery += this.state.legs.recovery;
    }
    this.setState({
      mobility,
      resilience,
      recovery,
    });
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
