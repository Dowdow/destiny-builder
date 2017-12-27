import React, { Component } from 'react';
import Armor from '../components/Armor';
import ModList from './ModList';
import '../css/ArmorBuilder.css';

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
    if (this.props.build.helmetMod) {
      mobility += this.props.build.helmetMod.mobility;
      resilience += this.props.build.helmetMod.resilience;
      recovery += this.props.build.helmetMod.recovery;
    }
    if (this.props.build.gauntletMod) {
      mobility += this.props.build.gauntletMod.mobility;
      resilience += this.props.build.gauntletMod.resilience;
      recovery += this.props.build.gauntletMod.recovery;
    }
    if (this.props.build.chestMod) {
      mobility += this.props.build.chestMod.mobility;
      resilience += this.props.build.chestMod.resilience;
      recovery += this.props.build.chestMod.recovery;
    }
    if (this.props.build.legsMod) {
      mobility += this.props.build.legsMod.mobility;
      resilience += this.props.build.legsMod.resilience;
      recovery += this.props.build.legsMod.recovery;
    }
    if (this.props.build.classArmorMod) {
      mobility += this.props.build.classArmorMod.mobility;
      resilience += this.props.build.classArmorMod.resilience;
      recovery += this.props.build.classArmorMod.recovery;
    }
  }

  render() {
    this.buildStats();
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          <div>
            <h2>Helmet</h2>
            <Armor armor={this.props.build.helmet} unequipItem={this.props.unequipItem} />
            <ModList
              mod={this.props.build.helmetMod}
              equipMod={this.props.equipMod}
              unequipMod={this.props.unequipMod}
              type="helmet"
              tier="legendary"
            />
          </div>
          <div>
            <h2>Gauntlet</h2>
            <Armor armor={this.props.build.gauntlet} unequipItem={this.props.unequipItem} />
            <ModList
              mod={this.props.build.gauntletMod}
              equipMod={this.props.equipMod}
              unequipMod={this.props.unequipMod}
              type="gauntlet"
              tier="legendary"
            />
          </div>
          <div>
            <h2>Chest</h2>
            <Armor armor={this.props.build.chest} unequipItem={this.props.unequipItem} />
            <ModList
              mod={this.props.build.chestMod}
              equipMod={this.props.equipMod}
              unequipMod={this.props.unequipMod}
              type="chest"
              tier="legendary"
            />
          </div>
          <div>
            <h2>Legs</h2>
            <Armor armor={this.props.build.legs} unequipItem={this.props.unequipItem} />
            <ModList
              mod={this.props.build.legsMod}
              equipMod={this.props.equipMod}
              unequipMod={this.props.unequipMod}
              type="legs"
              tier="legendary"
            />
          </div>
          <div>
            <h2>Class Armor</h2>
            <Armor armor={this.props.build.classArmor} unequipItem={this.props.unequipItem} />
            <ModList
              mod={this.props.build.classArmorMod}
              equipMod={this.props.equipMod}
              unequipMod={this.props.unequipMod}
              type="classitem_hunter"
              tier="legendary"
            />
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
