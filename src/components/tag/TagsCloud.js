import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';

import {Link} from 'react-router-dom';


const fx = 10000;

const style = (edges) => {
	const counts = edges.reduce ((prev, next) =>
		prev + next.node.stats.playcount, 0);

	const value = ((counts||0) < fx ? fx : counts) / fx;
	const result = (20 + (16 * Math.log (value))).toFixed (2);

	return {
		fontSize: `${result}%`
	};
}

const TagsCloud = ({viewer: {tags = {edges: []}}}) =>
	<ul className="list-inline cloud lowercase">
		{tags.edges.map (({node}) =>
			<li key={node.name}
				style={style (node.artists.edges)}>

				<Link to={'/tags/' + node.name}>
					{node.name}
				</Link>
			</li>
		)}
	</ul>

export default createFragmentContainer (TagsCloud, graphql`
	fragment TagsCloud_viewer on Viewer {
		tags (first: 200){
			edges {
				node {
					...on Tag {
						name
						artists (first: 4){
							edges {
								node {
									stats {
										playcount
									}
								}
							}
						}
					}
				}
			}
		}
	}`
)