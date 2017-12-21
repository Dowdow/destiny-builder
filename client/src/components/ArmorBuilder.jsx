import React, { Component } from 'react';
import Armor from '../components/Armor';
import '../css/ArmorBuilder.css';

class ArmorBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobility: 0,
      resilience: 0,
      recovery: 0,
    };
  }

  handleUnequip() {
    this.props.unequipItem();
  }

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          <div>
            <h2>Helmet</h2>
            { this.props.build.helmet !== null ? <Armor armor={this.props.build.helmet} /> : <img /> }
          </div>
          <div>
            <h2>Gauntlet</h2>
            { this.props.build.gauntlet !== null ? <Armor armor={this.props.build.gauntlet} /> : <img /> }
          </div>
          <div>
            <h2>Chest</h2>
            { this.props.build.chest !== null ? <Armor armor={this.props.build.chest} /> : <img /> }
          </div>
          <div>
            <h2>Legs</h2>
            { this.props.build.legs !== null ? <Armor armor={this.props.build.legs} /> : <img /> }
          </div>
          <div>
            <h2>Class Armor</h2>
            { this.props.build.classArmor !== null ? <Armor armor={this.props.build.classArmor} /> : <img /> }
          </div>
        </section>
        <section className="ArmorBuilder_stats">
          <h2>Mobility {this.props.build.mobility}</h2>
          <h2>Resilience {this.props.build.resilience}</h2>
          <h2>Recovery {this.props.build.recovery}</h2>
        </section>
      </div>
    );
  }
}

export default ArmorBuilder;
