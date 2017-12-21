import React, { Component } from 'react';
import '../css/Armor.css';

class Armor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    return (
      <div className="Armor">
        <img src={this.props.img} alt={this.props.names.fr} onClick={this.handleClick} />
        {this.state.show ?
          <div className="ArmorModal">
            <div className="ArmorModal_background" onClick={this.handleClick} />
            <div className="ArmorModal_content">
              <div className={`ArmorModalContent_header ${this.props.tier === 6 ? 'exotic' : 'legendary'}`}>
                <h2>{this.props.names.fr}</h2>
                <h3>{this.props.bucket.names.fr}</h3>
                <h4>Exotic</h4>
              </div>
              <div className="ArmorModalContent_body">
                <h3><span>{this.props.defense}</span> DEFENSE &nbsp;<span>{this.props.power}</span> POWER</h3>
                <p>{this.props.descriptions.fr}</p>
                <div>
                  <h4>Mobility {this.props.mobility}</h4>
                  <h4>Resilience {this.props.resilience}</h4>
                  <h4>Recovery {this.props.recovery}</h4>
                </div>
                <div>
                  {this.props.mods.map(mod => (<img key={mod._id} className="ArmorModalContent_mod" src={mod.img} alt={mod.names.fr} />))}
                </div>
                <img className="ArmorModalContent_screenshot" src={this.props.screenshot} alt={this.props.names.fr} />
              </div>
            </div>
          </div>
        : ''}
      </div>
    );
  }
}

export default Armor;
