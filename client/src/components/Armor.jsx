import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import EmptySlot from '../img/empty_slot.png';
import '../css/Armor.css';

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
                  alt={mod.names[this.props.lang]}
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
          <img className="Armor_img" src={this.props.armor.img} alt={this.props.armor.names[this.props.lang]} onClick={this.handleClick} />
          {mods}
          {this.state.show ?
            <div className="ArmorModal">
              <div className="ArmorModal_background" onClick={this.handleClick} />
              <div className="ArmorModal_content">
                <div className={`ArmorModalContent_header ${this.props.armor.tier === 6 ? 'exotic' : 'legendary'}`}>
                  <h2>{this.props.armor.names[this.props.lang]}</h2>
                  <div>
                    <h3>{this.props.armor.bucket.names[this.props.lang]}</h3>
                    <h4>{this.props.armor.tier === 6 ? <FormattedMessage id="tier.exotic" defaultMessage="Exotic" /> : <FormattedMessage id="tier.legendary" defaultMessage="Legendary" />}</h4>
                  </div>
                </div>
                <div className="ArmorModalContent_body">
                  <h3>
                    <span className="large">{this.props.armor.defense}</span> <FormattedMessage id="stat.defense" defaultMessage="Defense" />
                    &nbsp;<span className="large">{this.props.armor.power}</span> <FormattedMessage id="stat.power" defaultMessage="Power" />
                  </h3>
                  <p>{this.props.armor.descriptions[this.props.lang]}</p>
                  <div>
                    <h4><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /> {this.props.armor.mobility}</h4>
                    <h4><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /> {this.props.armor.resilience}</h4>
                    <h4><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /> {this.props.armor.recovery}</h4>
                  </div>
                  {this.props.armor.mods.length > 0 ?
                    <div>
                      {this.props.armor.mods.map(mod => (<img key={mod._id} className="ArmorModalContent_mod" src={mod.img} alt={mod.names[this.props.lang]} />))}
                    </div>
                  : ''}
                  <div>
                    {this.props.equipItem ? <button onClick={this.handleEquipItem}><FormattedMessage id="button.equip" defaultMessage="Equip" /></button> : ''}
                    {this.props.unequipItem ? <button onClick={this.handleUnequipItem}><FormattedMessage id="button.unequip" defaultMessage="Unequip" /></button> : ''}
                    <button onClick={this.handleClick}><FormattedMessage id="button.hide" defaultMessage="Hide" /></button>
                  </div>
                  <img className="ArmorModalContent_screenshot" src={this.props.armor.screenshot} alt={this.props.armor.names[this.props.lang]} />
                </div>
              </div>
            </div>
            : ''}
        </div>
      );
    }
    return (
      <div className="Armor">
        <img className="Armor_img" src={EmptySlot} alt="Empty" />
        {this.props.mods ? emptyMods : ''}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    lang: state.language,
  };
}

export default connect(mapStateToProps)(Armor);
