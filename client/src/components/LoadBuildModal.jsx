import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SmallBuild from './SmallBuild';
import { loadBuild, removeBuild } from '../actions/build';
import '../css/LoadBuildModal.css';

class LoadBuildModal extends Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    this.props.toggleModal();
  }

  render() {
    return (
      <div className="LoadBuildModal">
        <div className="LoadBuildModal_background" onClick={this.handleToggleModal} />
        <div className="LoadBuildModal_modal">
          <h2><FormattedMessage id="button.load" defaultMessage="" /></h2>
          <div>
            {Object.keys(this.props.builds).map(i =>
              (<SmallBuild
                key={this.props.builds[i].id}
                build={this.props.builds[i]}
                loadBuild={this.props.loadBuild}
                deleteBuild={this.props.removeBuild}
                toggleModal={this.props.toggleModal}
              />))}
          </div>
        </div>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    builds: state.savedBuilds,
  };
}

export default connect(mapStateToProps, { loadBuild, removeBuild })(LoadBuildModal);
