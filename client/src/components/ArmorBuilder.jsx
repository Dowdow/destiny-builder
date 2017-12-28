import React, { Component } from 'react';
import Armor from '../components/Armor';
import ModList from './ModList';
import '../css/ArmorBuilder.css';

let mobility = 0;
let resilience = 0;
let recovery = 0;

class ArmorBuilder extends Component {
  static buildStat(prop) {
    if (prop) {
      mobility += prop.mobility;
      resilience += prop.resilience;
      recovery += prop.recovery;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      typeClassArmor: 'classitem_titan:classitem_hunter:classitem_warlock',
    };
  }

  componentWillReceiveProps(nextProps) {
    mobility = 0;
    resilience = 0;
    recovery = 0;
    ArmorBuilder.buildStat(nextProps.build.helmet);
    ArmorBuilder.buildStat(nextProps.build.gauntlet);
    ArmorBuilder.buildStat(nextProps.build.chest);
    ArmorBuilder.buildStat(nextProps.build.legs);
    ArmorBuilder.buildStat(nextProps.build.classArmor);
    ArmorBuilder.buildStat(nextProps.build.helmetMod);
    ArmorBuilder.buildStat(nextProps.build.gauntletMod);
    ArmorBuilder.buildStat(nextProps.build.chestMod);
    ArmorBuilder.buildStat(nextProps.build.legsMod);
    ArmorBuilder.buildStat(nextProps.build.classArmorMod);
    if (nextProps.build.classArmor) {
      switch (nextProps.build.classArmor.class.class) {
        case 0:
          this.setState({
            typeClassArmor: 'classitem_titan',
          });
          break;
        case 1:
          this.setState({
            typeClassArmor: 'classitem_hunter',
          });
          break;
        case 2:
          this.setState({
            typeClassArmor: 'classitem_warlock',
          });
          break;
        default:
      }
    } else {
      this.setState({
        typeClassArmor: 'classitem_titan:classitem_hunter:classitem_warlock',
      });
    }
  }

  render() {
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
              type={this.state.typeClassArmor}
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
