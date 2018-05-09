// @flow
import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

import ArtistImage from './ArtistImage';
import ArtistTags from './ArtistTags';

export type ArtistPreviewFragment = {|
	+id: string,
	+name: string,
	+stats: {|
		+playcount: ?number,
		+listeners: ?number
	|},
	+bio: ?{|
		+summary: ?string
	|}
|};


type Props = {
	data: ArtistPreviewFragment,
	fullMode: boolean
};

const RawBio = ({bio}) => {
	const html = bio && bio.summary;

	return html
		? <div className="description"
			dangerouslySetInnerHTML={{__html: html}}/>
		: null;
}

const ArtistPreview = ({data, fullMode}: Props) => {
	const link = (
		<Link to={'/artists/' + data.name}>{data.name}</Link>
	);

	return (
		<div className={['media-item', fullMode ? 'full' : 'small'].join(' ')}>
			{fullMode ? (<h1>{link}</h1>) : (<h5>{link}</h5>)}

			<Link to={'/artists/' + data.name}>
				{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
				<ArtistImage
					data={data}
					size={fullMode ? 'extralarge' : 'medium'}/>
			</Link>

			<div className="artist-info">

				{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
				<ArtistTags data={data}/>

				<div className="stats">
					<span>{data.stats.listeners}</span>
					{' / '}
					<span>{data.stats.playcount}</span>
				</div>

				{fullMode ? (
					<RawBio bio={data.bio}/>
				) : null}

			</div>

			<div className="clearfix"/>
		</div>
	);
}

export default createFragmentContainer (ArtistPreview, graphql`
	fragment ArtistPreview on Artist {

		id
		name
		...ArtistImage

		stats {
			playcount
			listeners
		}

		bio {
			summary
		}

		...ArtistTags
	}`
)