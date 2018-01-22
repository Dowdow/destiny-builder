import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Armor from '../components/Armor';
import MiniMod from './MiniMod';
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

  static renderArmorBuilderEntry(id, title, armor, mod, miniMod, type, tier) {
    return (
      <div>
        <h2><FormattedMessage id={id} defaultMessage={title} /></h2>
        <div>
          <Armor armor={armor} />
          <MiniMod armor={armor} miniMod={miniMod} />
          <ModList mod={mod} type={type} tier={tier} />
        </div>
      </div>
    );
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

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          {ArmorBuilder.renderArmorBuilderEntry('build.helmet', 'Helmet', this.props.helmet, this.props.helmetMod, this.props.helmetMiniMod, 'helmet', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.gauntlets', 'Gauntlets', this.props.gauntlet, this.props.gauntletMod, this.props.gauntletMiniMod, 'gauntlet', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.chest', 'Chest Armor', this.props.chest, this.props.chestMod, this.props.chestMiniMod, 'chest', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.legs', 'Leg Armor', this.props.legs, this.props.legsMod, this.props.legsMiniMod, 'legs', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.classArmor', 'Class Armor', this.props.classArmor, this.props.classArmorMod, this.props.classArmorMiniMod, this.state.typeClassArmor, 'legendary')}
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
  };
}

export default connect(mapStateToProps)(ArmorBuilder);
