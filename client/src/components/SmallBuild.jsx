import React, { Component } from 'react';

class SmallBuild extends Component {
  constructor(props) {
    super(props);
    this.handleLoadBuild = this.handleLoadBuild.bind(this);
    this.handleDeleteBuild = this.handleDeleteBuild.bind(this);
  }

  handleLoadBuild() {
    this.props.loadBuild(this.props.build);
    this.props.toggleModal();
  }

  handleDeleteBuild() {
    this.props.deleteBuild(this.props.build.id);
  }

  render() {
    return (
      <div className="SmallBuild">
        <h4 onClick={this.handleLoadBuild}>{this.props.build.name}</h4>
        <span onClick={this.handleDeleteBuild}>X</span>
      </div>
    );
  }
}

export default SmallBuild;
