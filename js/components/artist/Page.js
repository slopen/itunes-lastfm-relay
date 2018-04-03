import React, { Component } from 'react'
import Relay from 'react-relay';

import { Link } from 'react-router'

import {basicFields, tagNodes} from '../../queries/Fragments';
import Similar from './Similar';


import LoaderStub from '../LoaderStub';
import ArtistPreview from './Preview';
import Thumbnail from './Thumbnail';


class ArtistPage extends Component {

  render () {
      var data = this.props.viewer.artists.edges [0].node || {},
          tags = ((data.tags || {}).edges || []),
          similar = ((data.similar || {}).edges || []);

      return (
        <div className="artist">
            <ArtistPreview data={data} fullMode={true}/>
            <div className="clearfix"/>
            <hr/>
            <Similar list={data}/>
        </div>
      );
  }

}

export default Relay.createContainer(ArtistPage, {

  initialVariables: {
    name: '',
    tagsLimit: 6,
    artistsLimit: 24,
    artistsTagsLimit: 3
  },


  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          artists (name: $name, first: 1) {
              edges {
                  node {
                      ${ArtistPreview.getFragment('data', {fullMode: true})}
                      ${Similar.getFragment('list')}
                  }
              }
          }
    }`,
  },
});