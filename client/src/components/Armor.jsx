import React, { Component } from 'react';
import '../css/Armor.css';

class Armor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEquipItem = this.handleEquipItem.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  handleEquipItem() {
    this.props.equipItem(this.props.armor);
  }

  render() {
    return (
      <div className="Armor">
        <img className="Armor_img" src={this.props.armor.img} alt={this.props.armor.names.fr} onClick={this.handleClick} />
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
                <img className="ArmorModalContent_screenshot" src={this.props.armor.screenshot} alt={this.props.armor.names.fr} />
                <button onClick={this.handleEquipItem}>Equip</button>
              </div>
            </div>
          </div>
        : ''}
      </div>
    );
  }
}

export default Armor;
