import React, { Component } from 'react';
import { connect } from 'react-redux';
import { equipMiniMod } from '../actions/build';
import ArmorModal from './ArmorModal';
import EmptySlot from '../img/empty_slot.png';
import '../css/Armor.css';

class Armor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEquipMiniMod = this.handleEquipMiniMod.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
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
          {this.state.show ? <ArmorModal armor={this.props.armor} handleShow={this.handleClick} /> : ''}
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

export default connect(mapStateToProps, { equipMiniMod })(Armor);
