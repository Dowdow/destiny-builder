import React, { Component } from 'react';
import Armor from '../components/Armor';
import '../css/ArmorBuilder.css';

const EMPTY_SLOT = 'https://www.bungie.net/common/destiny2_content/icons/a6bd6251c114762042b4c4231bd7505c.png';
let mobility = 0;
let resilience = 0;
let recovery = 0;

class ArmorBuilder extends Component {
  buildStats() {
    mobility = 0;
    resilience = 0;
    recovery = 0;
    if (this.props.build.helmet) {
      mobility += this.props.build.helmet.mobility;
      resilience += this.props.build.helmet.resilience;
      recovery += this.props.build.helmet.recovery;
    }
    if (this.props.build.gauntlet) {
      mobility += this.props.build.gauntlet.mobility;
      resilience += this.props.build.gauntlet.resilience;
      recovery += this.props.build.gauntlet.recovery;
    }
    if (this.props.build.chest) {
      mobility += this.props.build.chest.mobility;
      resilience += this.props.build.chest.resilience;
      recovery += this.props.build.chest.recovery;
    }
    if (this.props.build.legs) {
      mobility += this.props.build.legs.mobility;
      resilience += this.props.build.legs.resilience;
      recovery += this.props.build.legs.recovery;
    }
    if (this.props.build.classArmor) {
      mobility += this.props.build.classArmor.mobility;
      resilience += this.props.build.classArmor.resilience;
      recovery += this.props.build.classArmor.recovery;
    }
  }

  render() {
    this.buildStats();
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          <div>
            <h2>Helmet</h2>
            {this.props.build.helmet !== null ? <Armor armor={this.props.build.helmet} unequipItem={this.props.unequipItem} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div>}
          </div>
          <div>
            <h2>Gauntlet</h2>
            {this.props.build.gauntlet !== null ? <Armor armor={this.props.build.gauntlet} unequipItem={this.props.unequipItem} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div>}
          </div>
          <div>
            <h2>Chest</h2>
            {this.props.build.chest !== null ? <Armor armor={this.props.build.chest} unequipItem={this.props.unequipItem} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div>}
          </div>
          <div>
            <h2>Legs</h2>
            {this.props.build.legs !== null ? <Armor armor={this.props.build.legs} unequipItem={this.props.unequipItem} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div>}
          </div>
          <div>
            <h2>Class Armor</h2>
            {this.props.build.classArmor !== null ? <Armor armor={this.props.build.classArmor} unequipItem={this.props.unequipItem} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div>}
          </div>
        </section>
        <section className="ArmorBuilder_stats">
          <h2>Mobility {mobility}</h2>
          <h2>Resilience {resilience}</h2>
          <h2>Recovery {recovery}</h2>
        </section>
      </div>
    );
  }
}

export default ArmorBuilder;
