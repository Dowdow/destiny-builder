import React, { Component } from 'react';
import '../css/Armor.css';

const EMPTY_SLOT = 'https://www.bungie.net/common/destiny2_content/icons/a6bd6251c114762042b4c4231bd7505c.png';

class Armor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEquipItem = this.handleEquipItem.bind(this);
    this.handleUnequipItem = this.handleUnequipItem.bind(this);
    this.handleEquipMiniMod = this.handleEquipMiniMod.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  handleEquipItem() {
    this.handleClick();
    this.props.equipItem(this.props.armor);
  }

  handleUnequipItem() {
    this.handleClick();
    this.props.unequipItem(this.props.armor);
  }

  handleEquipMiniMod(mod) {
    this.props.equipMiniMod({
      _id: mod._id,
      hash: this.props.armor.bucket.hash,
      mobility: mod.mobility,
      resilience: mod.resilience,
      recovery: mod.recovery,
    });
  }

  render() {
    const emptyMods = (
      <div className="ArmorMods">
        <div />
        <div />
      </div>
    );
    if (this.props.armor !== null) {
      let mods = '';
      if (this.props.mods) {
        if (this.props.armor.mods.length > 0) {
          mods = (
            <div className="ArmorMods">
              {this.props.armor.mods.map(mod =>
                (<img
                  key={mod._id}
                  src={mod.img}
                  alt={mod.names.fr}
                  className={this.props.miniMod && this.props.miniMod._id === mod._id ? 'ArmorMods_selected' : ''}
                  onClick={() => this.handleEquipMiniMod(mod)}
                />))}
            </div>
          );
        } else {
          mods = emptyMods;
        }
      }
      return (
        <div className="Armor">
          <img className="Armor_img" src={this.props.armor.img} alt={this.props.armor.names.fr} onClick={this.handleClick} />
          {mods}
          {this.state.show ?
            <div className="ArmorModal">
              <div className="ArmorModal_background" onClick={this.handleClick} />
              <div className="ArmorModal_content">
                <div className={`ArmorModalContent_header ${this.props.armor.tier === 6 ? 'exotic' : 'legendary'}`}>
                  <h2>{this.props.armor.names.fr}</h2>
                  <h3>{this.props.armor.bucket.names.fr}</h3>
                  <h4>Exotic</h4>
                </div>
                <div className="ArmorModalContent_body">
                  <h3><span>{this.props.armor.defense}</span> DEFENSE &nbsp;<span>{this.props.armor.power}</span> POWER</h3>
                  <p>{this.props.armor.descriptions.fr}</p>
                  <div>
                    <h4>Mobility {this.props.armor.mobility}</h4>
                    <h4>Resilience {this.props.armor.resilience}</h4>
                    <h4>Recovery {this.props.armor.recovery}</h4>
                  </div>
                  <div>
                    {this.props.armor.mods.map(mod => (<img key={mod._id} className="ArmorModalContent_mod" src={mod.img} alt={mod.names.fr} />))}
                  </div>
                  {this.props.equipItem ? <button onClick={this.handleEquipItem}>Equip</button> : ''}
                  {this.props.unequipItem ? <button onClick={this.handleUnequipItem}>Unequip</button> : ''}
                  <img className="ArmorModalContent_screenshot" src={this.props.armor.screenshot} alt={this.props.armor.names.fr} />
                </div>
              </div>
            </div>
            : ''}
        </div>
      );
    }
    return (
      <div className="Armor">
        <img className="Armor_img" src={EMPTY_SLOT} alt="Empty" />
        {this.props.mods ? emptyMods : ''}
      </div>);
  }
}

export default Armor;
