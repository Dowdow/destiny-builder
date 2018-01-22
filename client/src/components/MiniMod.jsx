import React, { Component } from 'react';
import { connect } from 'react-redux';
import { equipMiniMod } from '../actions/build';
import '../css/MiniMod.css';

class MiniMod extends Component {
  constructor(props) {
    super(props);
    this.handleEquipMiniMod = this.handleEquipMiniMod.bind(this);
  }

  handleEquipMiniMod(mod) {
    this.props.equipMiniMod({
      _id: mod._id,
      hash: this.props.armor.bucket.hash,
      mobility: mod.mobility,
      resilience: mod.resilience,
      recovery: mod.recovery,
    });
  }

  render() {
    if (this.props.armor !== null) {
      return (
        <div className="MiniMod">
          {this.props.armor.mods.map(mod =>
            (<img
              key={mod._id}
              src={mod.img}
              alt={mod.names[this.props.lang]}
              className={this.props.miniMod && this.props.miniMod._id === mod._id ? 'MiniMod_selected' : ''}
              onClick={() => this.handleEquipMiniMod(mod)}
            />))}
        </div>
      );
    }
    return (
      <div className="MiniMod">
        <div />
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.language,
  };
}

export default connect(mapStateToProps, { equipMiniMod })(MiniMod);
