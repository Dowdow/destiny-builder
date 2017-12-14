import React from 'react';

const Armor = props => (
  <div>
    <h6>{props.names.fr}</h6>
    <img src={props.img} alt={props.names.fr} />
  </div>
);

export default Armor;
