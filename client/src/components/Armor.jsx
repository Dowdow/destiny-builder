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
          <div className="ArmorModal" onClick={this.handleClick}>Modal</div>
        : ''}
      </div>
    );
  }
}

export default Armor;
