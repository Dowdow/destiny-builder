import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Armor from '../components/Armor';
import MiniMod from './MiniMod';
import ModList from './ModList';
import LoadBuildModal from './LoadBuildModal';
import { addBuildToSave, resetBuild, saveBuild } from '../actions/build';
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
      showLoadBuildModal: false,
      typeClassArmor: 'classitem_titan:classitem_hunter:classitem_warlock',
    };
    this.handleOverrideBuild = this.handleOverrideBuild.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleSaveBuild = this.handleSaveBuild.bind(this);
    this.handeResetBuild = this.handeResetBuild.bind(this);
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

  saveBuild(id, name) {
    const build = {};
    build[id] = {
      id,
      name,
      helmet: this.props.helmet,
      gauntlet: this.props.gauntlet,
      chest: this.props.chest,
      legs: this.props.legs,
      classArmor: this.props.classArmor,
      helmetMod: this.props.helmetMod,
      gauntletMod: this.props.gauntletMod,
      chestMod: this.props.chestMod,
      legsMod: this.props.legsMod,
      classArmorMod: this.props.classArmorMod,
      helmetMiniMod: this.props.helmetMiniMod,
      gauntletMiniMod: this.props.gauntletMiniMod,
      chestMiniMod: this.props.chestMiniMod,
      legsMiniMod: this.props.legsMiniMod,
      classArmorMiniMod: this.props.classArmorMiniMod,
    };
    this.props.addBuildToSave(build);
  }

  handleOverrideBuild() {
    this.saveBuild(this.props.currentLoadedBuild.id, this.props.currentLoadedBuild.name);
  }

  handleSaveBuild() {
    const name = prompt();
    if (name !== null && name.trim() !== '') {
      this.saveBuild(`${name}-${Date.now()}`, name);
    }
  }

  handleShowModal() {
    this.setState(prevState => ({
      showLoadBuildModal: !prevState.showLoadBuildModal,
    }));
  }

  handeResetBuild() {
    this.props.resetBuild();
  }

  renderArmorBuilderEntry(id, title, armor, mod, mods, miniMod) {
    return (
      <div>
        <h2><FormattedMessage id={id} defaultMessage={title} /></h2>
        <div>
          <Armor locale={this.props.locale} armor={armor} build />
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
        <section className="ArmorBuilder_actions">
          <div className="ArmorBuilderActions_stats">
            <h2><FormattedMessage id="stat.mobility" defaultMessage="Mobility" /> {mobility}</h2>
            <h2><FormattedMessage id="stat.resilience" defaultMessage="Resilience" /> {resilience}</h2>
            <h2><FormattedMessage id="stat.recovery" defaultMessage="Recovery" /> {recovery}</h2>
          </div>
          {this.props.currentLoadedBuild !== null ? <p>{this.props.currentLoadedBuild.name}</p> : ''}
          <div className="ArmorBuilderActions_actions">
            {this.props.currentLoadedBuild !== null ?
              <button onClick={this.handleOverrideBuild}>
                <FormattedMessage id="button.override" defaultMessage="" />
              </button> : ''}
            <button className="button_blue" onClick={this.handleShowModal}>
              <FormattedMessage id="button.load" defaultMessage="" />
            </button>
            <button className="button_green" onClick={this.handleSaveBuild}>
              <FormattedMessage id="button.save" defaultMessage="" />
            </button>
            <button className="button_red" onClick={this.handeResetBuild}>
              <FormattedMessage id="button.reset" defaultMessage="" />
            </button>
          </div>
        </section>
        { this.state.showLoadBuildModal ? <LoadBuildModal toggleModal={this.handleShowModal} /> : '' }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLoadedBuild: state.currentLoadedBuild,
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
  addBuildToSave,
  resetBuild,
  getHelmetMods,
  getGauntletMods,
  getChestMods,
  getLegsMods,
  getClassArmorMods,
})(ArmorBuilder);
