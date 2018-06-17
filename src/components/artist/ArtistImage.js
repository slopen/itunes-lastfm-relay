// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

export type ArtistImageType = {
    image: $ReadOnlyArray <{|
        +url: ?string,
        +size: ?string
    |}>
};

type Props = {
    data: ArtistImageType,
    size: | 'extralarge' | 'medium' | 'small'
};

const ArtistImage = ({data, size}: Props) => {
    const images = data.image || [];

    let image = null;

    if (size) {
        image = images.find ((item) =>
            item && item.size === size
        );
    }

    image = image || images [0];

    if (image) {
        return (
            <div className="thumbnail">
                <img src={image.url} />
            </div>
        )
    }

    return null;
}

export default createFragmentContainer (ArtistImage, graphql`
    fragment ArtistImage on Artist {
        image {
            url
            size
        }
    }`
)