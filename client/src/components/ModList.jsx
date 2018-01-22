import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mod from './Mod';
import { equipMod, unequipMod } from '../actions/build';
import ModSlot from '../img/mod_slot.png';
import '../css/ModList.css';

class ModList extends Component {
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
    if (this.props.mod) {
      return (
        <Mod mod={this.props.mod} unequipMod={this.props.unequipMod} />
      );
    }
    return (
      <div className="ModList">
        <img className="ModList_img" src={ModSlot} alt="Empty" onClick={this.handleClick} />
        {this.state.show ?
          <div className="ModListModal">
            <div className="ModListModal_background" onClick={this.handleClick} />
            <div className="ModListModal_content">
              {this.props.mods.map(m => <Mod key={m._id} mod={m} equipMod={this.props.equipMod} />)}
            </div>
          </div>
                    : ''}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { equipMod, unequipMod })(ModList);
