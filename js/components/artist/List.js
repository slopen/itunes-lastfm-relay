import React, { Component } from 'react';
import Relay from 'react-relay';

import ArtistPreview from './Preview';
import {basicFields, tagNodes} from '../../queries/Fragments';

import ReactList from 'react-list';

const artistsLimit = 5;

export default class ArtistsList extends Component {
    constructor(props){
        super (props);
        this.renderRow = this.renderRow.bind(this);
    }

    getList () {
        const {list: {similar, artists}} = this.props;
        return (similar || artists).edges || [];
    }

    renderRow(key, index) {
        const list = this.getList();

        if (index === list.length - 1) {
          this.props.relay.setVariables({
            artistsLimit: list.length + artistsLimit
          });
        }

        var artist = list [index].node;
        return (
            <div className="item" key={artist.id}>
                <ArtistPreview data={artist}/>
            </div>
        );
    }

    render() {
        const list = this.getList();

        return (
          <div className="media-list">
            <ReactList
                itemRenderer={this.renderRow}
                length={list.length }/>
          </div>
        );
    }

    // render (){
    //     const {'list': {similar, artists}} = this.props;
    //     var list = (similar || artists).edges || [];

    //     return (
    //         <ul className="list-unstyled media-list">
    //             {list.map(function(edge){
    //                 return (
    //                     <li key={edge.node.id}>
    //                         <ArtistPreview data={edge.node}/>
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     );
    // }
}