import React, { Component } from 'react';
import Relay from 'react-relay';

import Header from './Header';

class App extends Component {
  render() {
    const {routes, children, viewer} = this.props;

    return (
      <div>
        <Header routes={routes} viewer={viewer}/>
        <hr/>
        <div className="content"> {children} </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {

  fragments: {
    viewer: (Component) => Relay.QL`
      fragment on Viewer {
        ${Header.getFragment('viewer')}
      }
    `,
  },
});
