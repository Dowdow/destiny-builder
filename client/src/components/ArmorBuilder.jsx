import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Armor from '../components/Armor';
import MiniMod from './MiniMod';
import ModList from './ModList';
import { getHelmetMods, getGauntletMods, getChestMods, getLegsMods, getClassArmorMods } from '../actions/mod';
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

  componentWillMount() {
    this.props.getHelmetMods();
    this.props.getGauntletMods();
    this.props.getChestMods();
    this.props.getLegsMods();
    this.props.getClassArmorMods(this.state.typeClassArmor);
  }

  componentWillReceiveProps(nextProps) {
    mobility = 0;
    resilience = 0;
    recovery = 0;
    ArmorBuilder.buildStat(nextProps.helmet);
    ArmorBuilder.buildStat(nextProps.gauntlet);
    ArmorBuilder.buildStat(nextProps.chest);
    ArmorBuilder.buildStat(nextProps.legs);
    ArmorBuilder.buildStat(nextProps.classArmor);
    ArmorBuilder.buildStat(nextProps.helmetMod);
    ArmorBuilder.buildStat(nextProps.gauntletMod);
    ArmorBuilder.buildStat(nextProps.chestMod);
    ArmorBuilder.buildStat(nextProps.legsMod);
    ArmorBuilder.buildStat(nextProps.classArmorMod);
    ArmorBuilder.buildStat(nextProps.helmetMiniMod);
    ArmorBuilder.buildStat(nextProps.gauntletMiniMod);
    ArmorBuilder.buildStat(nextProps.chestMiniMod);
    ArmorBuilder.buildStat(nextProps.legsMiniMod);
    ArmorBuilder.buildStat(nextProps.classArmorMiniMod);
    if (nextProps.classArmor) {
      switch (nextProps.classArmor.class.class) {
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

  componentWillUpdate(nextProps, nextState) {
    if (this.state.typeClassArmor !== nextState.typeClassArmor) {
      this.props.getClassArmorMods(nextState.typeClassArmor);
    }
  }

  renderArmorBuilderEntry(id, title, armor, mod, mods, miniMod) {
    return (
      <div>
        <h2><FormattedMessage id={id} defaultMessage={title} /></h2>
        <div>
          <Armor locale={this.props.locale} armor={armor} />
          <MiniMod locale={this.props.locale} armor={armor} miniMod={miniMod} />
          <ModList locale={this.props.locale} mod={mod} mods={mods} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          {this.renderArmorBuilderEntry('build.helmet', 'Helmet', this.props.helmet, this.props.helmetMod, this.props.helmetMods, this.props.helmetMiniMod)}
          {this.renderArmorBuilderEntry('build.gauntlets', 'Gauntlets', this.props.gauntlet, this.props.gauntletMod, this.props.gauntletMods, this.props.gauntletMiniMod)}
          {this.renderArmorBuilderEntry('build.chest', 'Chest Armor', this.props.chest, this.props.chestMod, this.props.chestMods, this.props.chestMiniMod)}
          {this.renderArmorBuilderEntry('build.legs', 'Leg Armor', this.props.legs, this.props.legsMod, this.props.legsMods, this.props.legsMiniMod)}
          {this.renderArmorBuilderEntry('build.classArmor', 'Class Armor', this.props.classArmor, this.props.classArmorMod, this.props.classArmorMods, this.props.classArmorMiniMod)}
        </section>
        <section className="ArmorBuilder_stats">
          <h2><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /> {mobility}</h2>
          <h2><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /> {resilience}</h2>
          <h2><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /> {recovery}</h2>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    helmet: state.buildHelmet,
    gauntlet: state.buildGauntlet,
    chest: state.buildChest,
    legs: state.buildLegs,
    classArmor: state.buildClassArmor,
    helmetMod: state.buildHelmetMod,
    gauntletMod: state.buildGauntletMod,
    chestMod: state.buildChestMod,
    legsMod: state.buildLegsMod,
    classArmorMod: state.buildClassArmorMod,
    helmetMiniMod: state.buildHelmetMiniMod,
    gauntletMiniMod: state.buildGauntletMiniMod,
    chestMiniMod: state.buildChestMiniMod,
    legsMiniMod: state.buildLegsMiniMod,
    classArmorMiniMod: state.buildClassArmorMiniMod,
    helmetMods: state.modHelmet,
    gauntletMods: state.modGauntlet,
    chestMods: state.modChest,
    legsMods: state.modLegs,
    classArmorMods: state.modClassArmor,
  };
}

export default connect(mapStateToProps, {
  getHelmetMods, getGauntletMods, getChestMods, getLegsMods, getClassArmorMods,
})(ArmorBuilder);
