import React, { Component } from 'react';
import Mod from './Mod';
import { getModsByFilter } from '../api';
import '../css/ModList.css';

const MOD_SLOT = 'https://www.bungie.net/common/destiny2_content/icons/9e38278ce140054bbf9d6990f671382a.png';

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
    const mods = await getModsByFilter({ type: nextProps.type, tier: nextProps.tier });
    this.setState({
      show: false,
      mods,
    });
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
        <img className="ModList_img" src={MOD_SLOT} alt="Empty" onClick={this.handleClick} />
        {this.state.show ?
          <div className="ModListModal">
            <div className="ModListModal_background" onClick={this.handleClick} />
            <div className="ModListModal_content">
              {this.state.mods.map(m => <Mod key={m._id} mod={m} equipMod={this.props.equipMod} />)}
            </div>
          </div>
                    : ''}
      </div>
    );
  }
}

export default ModList;
