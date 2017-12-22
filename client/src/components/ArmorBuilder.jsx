import React, { Component } from 'react';
import Armor from '../components/Armor';
import '../css/ArmorBuilder.css';

const EMPTY_SLOT = 'https://www.bungie.net/common/destiny2_content/icons/a6bd6251c114762042b4c4231bd7505c.png';

class ArmorBuilder extends Component {
  handleUnequip() {
    this.props.unequipItem();
  }

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          <div>
            <h2>Helmet</h2>
            { this.props.build.helmet !== null ? <Armor armor={this.props.build.helmet} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div> }
          </div>
          <div>
            <h2>Gauntlet</h2>
            { this.props.build.gauntlet !== null ? <Armor armor={this.props.build.gauntlet} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div> }
          </div>
          <div>
            <h2>Chest</h2>
            { this.props.build.chest !== null ? <Armor armor={this.props.build.chest} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div> }
          </div>
          <div>
            <h2>Legs</h2>
            { this.props.build.legs !== null ? <Armor armor={this.props.build.legs} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div> }
          </div>
          <div>
            <h2>Class Armor</h2>
            { this.props.build.classArmor !== null ? <Armor armor={this.props.build.classArmor} /> :
            <div className="ArmorBuilder_empty">
              <img src={EMPTY_SLOT} alt="Empty" />
            </div> }
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
