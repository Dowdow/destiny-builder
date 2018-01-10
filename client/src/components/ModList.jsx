import React, { Component } from 'react';
import Mod from './Mod';
import { getModsByFilter } from '../utils/api';
import ModSlot from '../img/mod_slot.png';
import '../css/ModList.css';

class ModList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mods: [],
      show: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentWillMount() {
    const mods = await getModsByFilter({ type: this.props.type, tier: this.props.tier });
    this.setState({
      mods,
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type || this.props.tier !== nextProps.tier) {
      const mods = await getModsByFilter({ type: nextProps.type, tier: nextProps.tier });
      this.setState({
        show: false,
        mods,
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
        <Mod lang={this.props.lang} mod={this.props.mod} unequipMod={this.props.unequipMod} />
      );
    }
    return (
      <div className="ModList">
        <img className="ModList_img" src={ModSlot} alt="Empty" onClick={this.handleClick} />
        {this.state.show ?
          <div className="ModListModal">
            <div className="ModListModal_background" onClick={this.handleClick} />
            <div className="ModListModal_content">
              {this.state.mods.map(m => <Mod key={m._id} lang={this.props.lang} mod={m} equipMod={this.props.equipMod} />)}
            </div>
          </div>
                    : ''}
      </div>
    );
  }
}

export default ModList;
