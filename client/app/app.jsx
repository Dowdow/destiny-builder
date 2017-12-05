import React from 'react';
import {render} from 'react-dom';

class AppContainer extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <h1> Destiny 2 Build Generator </h1>
            </div>
        )
    }
}

render(<AppContainer/>, document.getElementsByTagName('body')[0]);