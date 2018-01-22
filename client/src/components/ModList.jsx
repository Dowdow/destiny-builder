import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mod from './Mod';
import { getAllMods, getModsByFilter } from '../actions/mod';
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

  componentWillMount() {
    this.props.getModsByFilter({ type: this.props.type, tier: this.props.tier });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type || this.props.tier !== nextProps.tier) {
      this.props.getModsByFilter({ type: nextProps.type, tier: nextProps.tier });
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        show: false,
      });
    }
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

function mapStateToProps(state) {
  return {
    mods: state.mod,
  };
}

export default connect(mapStateToProps, { getAllMods, getModsByFilter })(ModList);

