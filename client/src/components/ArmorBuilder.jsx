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
          <Armor armor={armor} miniMod={miniMod} mods />
          <MiniMod />
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

  render() {
    return (
      <div className="ArmorBuilder">
        <section className="ArmorBuilder_armors">
          {ArmorBuilder.renderArmorBuilderEntry('build.helmet', 'Helmet', this.props.build.helmet, this.props.build.helmetMod, this.props.build.helmetMiniMod, 'helmet', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.gauntlets', 'Gauntlets', this.props.build.gauntlet, this.props.build.gauntletMod, this.props.build.gauntletMiniMod, 'gauntlet', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.chest', 'Chest Armor', this.props.build.chest, this.props.build.chestMod, this.props.build.chestMiniMod, 'chest', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.legs', 'Leg Armor', this.props.build.legs, this.props.build.legsMod, this.props.build.legsMiniMod, 'legs', 'legendary')}
          {ArmorBuilder.renderArmorBuilderEntry('build.classArmor', 'Class Armor', this.props.build.classArmor, this.props.build.classArmorMod, this.props.build.classArmorMiniMod, this.state.typeClassArmor, 'legendary')}
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
    build: state.build,
  };
}

export default connect(mapStateToProps)(ArmorBuilder);
