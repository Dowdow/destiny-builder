import React from 'react';
import '../css/Armor.css';

const Armor = props => (
  <div className="Armor">
    <img src={props.img} alt={props.names.fr} />
  </div>
);

export default Armor;
