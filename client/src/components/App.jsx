import React, { Component } from 'react';
import ArmorBuilder from './ArmorBuilder';
import ArmorList from './ArmorList';
import '../css/App.css';

const TYPE_HELMET = '3448274439';
const TYPE_GAUNTLET = '3551918588';
const TYPE_CHEST = '14239492';
const TYPE_LEG = '20886954';
const TYPE_CLASS_ITEM = '1585787867';

const MOD_HEAD = 'enhancements.head';
const MOD_GAUNTLET = 'enhancements.arms';
const MOD_CHEST = 'enhancements.chest';
const MOD_LEG = 'enhancements.legs';
const MOD_CLASS_ITEM_TITAN = 'enhancements.class_titan';
const MOD_CLASS_ITEM_HUNTER = 'enhancements.class_hunter';
const MOD_CLASS_ITEM_WARLOCK = 'enhancements.class_warlock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helmet: null,
      gauntlet: null,
      chest: null,
      legs: null,
      classArmor: null,
      helmetMod: null,
      gauntletMod: null,
      chestMod: null,
      legsMod: null,
      classArmorMod: null,
      helmetMiniMod: null,
      gauntletMiniMod: null,
      chestMiniMod: null,
      legsMiniMod: null,
      classArmorMiniMod: null,

    };
    this.handleEquipItem = this.handleEquipItem.bind(this);
    this.handleUnequipItem = this.handleUnequipItem.bind(this);
    this.handleEquipMod = this.handleEquipMod.bind(this);
    this.handleUnequipMod = this.handleUnequipMod.bind(this);
    this.handleEquipMiniMod = this.handleEquipMiniMod.bind(this);
  }

  handleEquipItem(item) {
    this.setState(prevState => ({
      helmet: item.bucket.hash === TYPE_HELMET ? item : prevState.helmet,
      gauntlet: item.bucket.hash === TYPE_GAUNTLET ? item : prevState.gauntlet,
      chest: item.bucket.hash === TYPE_CHEST ? item : prevState.chest,
      legs: item.bucket.hash === TYPE_LEG ? item : prevState.legs,
      classArmor: item.bucket.hash === TYPE_CLASS_ITEM ? item : prevState.classArmor,
      classArmorMod: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmorMod,
      helmetMiniMod: item.bucket.hash === TYPE_HELMET ? null : prevState.helmetMiniMod,
      gauntletMiniMod: item.bucket.hash === TYPE_GAUNTLET ? null : prevState.gauntletMiniMod,
      chestMiniMod: item.bucket.hash === TYPE_CHEST ? null : prevState.chestMiniMod,
      legsMiniMod: item.bucket.hash === TYPE_LEG ? null : prevState.legsMiniMod,
      classArmorMiniMod: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmorMiniMod,
    }));
  }

  handleUnequipItem(item) {
    this.setState(prevState => ({
      helmet: item.bucket.hash === TYPE_HELMET ? null : prevState.helmet,
      gauntlet: item.bucket.hash === TYPE_GAUNTLET ? null : prevState.gauntlet,
      chest: item.bucket.hash === TYPE_CHEST ? null : prevState.chest,
      legs: item.bucket.hash === TYPE_LEG ? null : prevState.legs,
      classArmor: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmor,
      classArmorMod: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmorMod,
      helmetMiniMod: item.bucket.hash === TYPE_HELMET ? null : prevState.helmetMiniMod,
      gauntletMiniMod: item.bucket.hash === TYPE_GAUNTLET ? null : prevState.gauntletMiniMod,
      chestMiniMod: item.bucket.hash === TYPE_CHEST ? null : prevState.chestMiniMod,
      legsMiniMod: item.bucket.hash === TYPE_LEG ? null : prevState.legsMiniMod,
      classArmorMiniMod: item.bucket.hash === TYPE_CLASS_ITEM ? null : prevState.classArmorMiniMod,
    }));
  }

  handleEquipMod(mod) {
    this.setState(prevState => ({
      helmetMod: mod.type === MOD_HEAD ? mod : prevState.helmetMod,
      gauntletMod: mod.type === MOD_GAUNTLET ? mod : prevState.gauntletMod,
      chestMod: mod.type === MOD_CHEST ? mod : prevState.chestMod,
      legsMod: mod.type === MOD_LEG ? mod : prevState.legsMod,
      classArmorMod: [MOD_CLASS_ITEM_TITAN, MOD_CLASS_ITEM_HUNTER, MOD_CLASS_ITEM_WARLOCK].includes(mod.type) ? mod : prevState.classArmorMod,
    }));
  }

  handleUnequipMod(mod) {
    this.setState(prevState => ({
      helmetMod: mod.type === MOD_HEAD ? null : prevState.helmetMod,
      gauntletMod: mod.type === MOD_GAUNTLET ? null : prevState.gauntletMod,
      chestMod: mod.type === MOD_CHEST ? null : prevState.chestMod,
      legsMod: mod.type === MOD_LEG ? null : prevState.legsMod,
      classArmorMod: [MOD_CLASS_ITEM_TITAN, MOD_CLASS_ITEM_HUNTER, MOD_CLASS_ITEM_WARLOCK].includes(mod.type) ? null : prevState.classArmorMod,
    }));
  }

  handleEquipMiniMod(miniMod) {
    this.setState(prevState => ({
      helmetMiniMod: miniMod.hash === TYPE_HELMET ? miniMod : prevState.helmetMiniMod,
      gauntletMiniMod: miniMod.hash === TYPE_GAUNTLET ? miniMod : prevState.gauntletMiniMod,
      chestMiniMod: miniMod.hash === TYPE_CHEST ? miniMod : prevState.chestMiniMod,
      legsMiniMod: miniMod.hash === TYPE_LEG ? miniMod : prevState.legsMiniMod,
      classArmorMiniMod: miniMod.hash === TYPE_CLASS_ITEM ? miniMod : prevState.classArmorMiniMod,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Destiny 2 Build Generator</h1>
        <ArmorBuilder
          build={this.state}
          unequipItem={this.handleUnequipItem}
          equipMod={this.handleEquipMod}
          unequipMod={this.handleUnequipMod}
          equipMiniMod={this.handleEquipMiniMod}
        />
        <ArmorList equipItem={this.handleEquipItem} />
      </div>
    );
  }
}

export default App;
