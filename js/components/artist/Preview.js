import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import {basicFields, tagNodes} from '../../queries/Fragments';

import Thumbnail from './Thumbnail';
import TagsList from './Tags';

class ArtistPreview extends Component {

    rawBio () {
        var bio = this.props.data.bio &&
            this.props.data.bio.summary;

        return {__html: bio};
    }

    render () {
        var data = this.props.data || {},
            fullMode = this.props.fullMode;

        var link = (
            <Link to={'/artist/' + data.name}>{data.name}</Link>
        );

        return (
            <div className={['media-item', fullMode ? 'full' : 'small'].join(' ')}>
                {fullMode ? (<h1>{link}</h1>) : (<h5>{link}</h5>)}

                <Link to={'/artist/' + data.name}>
                    <Thumbnail image={data.image}
                        size={fullMode ? 'extralarge' : 'medium'}/>
                </Link>

                <div className="artist-info">

                    <TagsList list={data}/>

                    <div className="stats">
                        <span>{data.stats.listeners}</span> / <span>{data.stats.playcount}</span>
                    </div>

                    {fullMode ?
                        <div className="description"
                            dangerouslySetInnerHTML={this.rawBio()} />
                    : ''}

                </div>

                <div className="clearfix"/>
            </div>
        );
    }
}

export default Relay.createContainer(ArtistPreview, {

  initialVariables: {
    fullMode: false,
    artistsTagsLimit: 3
  },


  fragments: {
    data: ({fullMode}) => Relay.QL`
        fragment on Artist {

            ${basicFields}

            bio @include(if: $fullMode){
                summary
            }

            ${TagsList.getFragment('list', {
                fullMode: fullMode
            })}
        }`,
  },
});