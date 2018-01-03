import React, { Component } from 'react';
import '../css/Mod.css';

class Mod extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.equipMod) {
      this.props.equipMod(this.props.mod);
    } else if (this.props.unequipMod) {
      this.props.unequipMod(this.props.mod);
    }
  }

  render() {
    return (
      <div className="Mod" onClick={this.handleClick}>
        <img className="Mod_img" src={this.props.mod.img} alt={this.props.mod.names[this.props.lang]} />
        <div className="Mod_tooltip">
          <h4>{this.props.mod.names[this.props.lang]}</h4>
          <p>{this.props.mod.descriptions[this.props.lang]}</p>
        </div>
      </div>
    );
  }
}

export default Mod;
