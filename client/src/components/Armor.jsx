import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    return (
      <div className="Armor">
        {this.props.armor !== null ?
          <img className="Armor_img" src={this.props.armor.img} alt={this.props.armor.names[this.props.locale]} onClick={this.handleClick} />
          : <img className="Armor_img" src={EmptySlot} alt="Empty" />}
        {this.state.show ? <ArmorModal armor={this.props.armor} handleShow={this.handleClick} /> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: state.intlReducer.locale,
  };
}

export default connect(mapStateToProps)(Armor);
