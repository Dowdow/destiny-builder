import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class ArmorModal extends Component {
  render() {
    return (
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
              <span className="large">{this.props.armor.power}</span> <FormattedMessage id="stat.power" defaultMessage="Power" />
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
    );
  }
}

export default ArmorModal;
