import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

import ArtistImage from './ArtistImage';
import ArtistTags from './ArtistTags';


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
			<Link to={'/artists/' + data.name}>{data.name}</Link>
		);

		return (
			<div className={['media-item', fullMode ? 'full' : 'small'].join(' ')}>
				{fullMode ? (<h1>{link}</h1>) : (<h5>{link}</h5>)}

				<Link to={'/artists/' + data.name}>
					<ArtistImage image={data.image}
						size={fullMode ? 'extralarge' : 'medium'}/>
				</Link>

				<div className="artist-info">

					<ArtistTags data={data}/>

					<div className="stats">
						<span>{data.stats.listeners}</span> / <span>{data.stats.playcount}</span>
					</div>

					{fullMode ? (
						<div className="description"
							dangerouslySetInnerHTML={this.rawBio ()} />
					) : null}

				</div>

				<div className="clearfix"/>
			</div>
		);
	}
}

export default createFragmentContainer (ArtistPreview, graphql`
	fragment ArtistPreview on Artist {

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

		bio {
			summary
		}

		...ArtistTags
	}`
)