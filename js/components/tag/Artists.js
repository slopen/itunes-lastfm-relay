import React, { Component } from 'react';
import Relay from 'react-relay';

import ArtistPreview from '../artist/Preview';
import {basicFields, tagNodes} from '../../queries/Fragments';

import ArtistsList from '../artist/List';


export default Relay.createContainer (ArtistsList, {

  initialVariables: {
      artistsLimit: 100,
      artistsTagsLimit: 3
  },

  fragments: {
    list: () => Relay.QL`
      fragment on Tag {
        artists (first: $artistsLimit){
            edges {
                node {
                  id
                  ${ArtistPreview.getFragment('data')}
                }
            }
        }
      }
    `
  },
});