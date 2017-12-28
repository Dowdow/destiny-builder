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
    ArmorBuilder.buildStat(nextProps.build.helmetMiniMod);
    ArmorBuilder.buildStat(nextProps.build.gauntletMiniMod);
    ArmorBuilder.buildStat(nextProps.build.chestMiniMod);
    ArmorBuilder.buildStat(nextProps.build.legsMiniMod);
    ArmorBuilder.buildStat(nextProps.build.classArmorMiniMod);
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

  renderArmorBuilderEntry(title, armor, mod, miniMod, type, tier) {
    return (
      <div>
        <h2>{title}</h2>
        <Armor
          armor={armor}
          miniMod={miniMod}
          unequipItem={this.props.unequipItem}
          equipMiniMod={this.props.equipMiniMod}
          mods
        />
        <ModList
          mod={mod}
          equipMod={this.props.equipMod}
          unequipMod={this.props.unequipMod}
          type={type}
          tier={tier}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          {this.renderArmorBuilderEntry('Helmet', this.props.build.helmet, this.props.build.helmetMod, this.props.build.helmetMiniMod, 'helmet', 'legendary')}
          {this.renderArmorBuilderEntry('Gauntlet', this.props.build.gauntlet, this.props.build.gauntletMod, this.props.build.gauntletMiniMod, 'gauntlet', 'legendary')}
          {this.renderArmorBuilderEntry('Chest', this.props.build.chest, this.props.build.chestMod, this.props.build.chestMiniMod, 'chest', 'legendary')}
          {this.renderArmorBuilderEntry('Legs', this.props.build.legs, this.props.build.legsMod, this.props.build.legsMiniMod, 'legs', 'legendary')}
          {this.renderArmorBuilderEntry('Class Armor', this.props.build.classArmor, this.props.build.classArmorMod, this.props.build.classArmorMiniMod, this.state.typeClassArmor, 'legendary')}
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
