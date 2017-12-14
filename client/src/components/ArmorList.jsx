import React, { Component } from 'react';
import Armor from './Armor';
import { getAllArmors } from '../api';
import '../css/ArmorList.css';

class ArmorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armors: [],
    };
  }

  async componentWillMount() {
    const armors = await getAllArmors();
    this.setState({
      armors,
    });
  }

  render() {
    return (
      <div>
        <h1>Armors</h1>
        {this.state.armors.map(armor => <Armor key={armor._id} {...armor} />)}
      </div>
    );
  }
}

export default ArmorList;
