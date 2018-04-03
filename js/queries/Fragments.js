import Relay from 'react-relay';

export const basicFields = Relay.QL`
    fragment basicFields on Artist {
        id
        name
        image {
            url
            size
        }
        stats {
            playcount
            listeners
        }
    }
`;

export const tagNodes = Relay.QL`
    fragment tagNodes on ArtistTagsConnection {
        edges {
            node {
                name
            }
        }
    }
`;


export default {

    ARTIST_SHORT: Relay.QL`
        fragment on Artist {
            id
            name
            stats {
                playcount
            }
        }
    `,

    ARTIST_FULL: Relay.QL`
        fragment on Artist {

            ${basicFields}

            bio {
                summary
            }

            tags (first: $tagsLimit){
                ${tagNodes}
            }

            similar (first: $similarLimit) {
                edges {
                    node {

                        ${basicFields}

                        tags (first: $similarTagsLimit){
                            ${tagNodes}
                        }
                    }
                }
            }
        }
    `,

    TAG_SHORT: Relay.QL`
        fragment on Tag {
            name
            artists (first: $lookup){
                edges {
                    node {
                        stats {
                            playcount
                        }
                    }
                }
            }
        }
    `,



    TAG_FULL: Relay.QL`
        fragment on Tag {
            name
            artists (first: $artistsLimit) {
                edges {
                    node {

                        ${basicFields}

                        tags (first: $artistsTagsLimit) {
                            ${tagNodes}
                        }
                    }
                }
            }
        }
    `,

};