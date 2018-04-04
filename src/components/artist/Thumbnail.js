import React, {Component} from 'react';

class Thumbnail extends Component {
    render () {
        var images = this.props.image || [],
            size = this.props.size,
            image = null;

        if (size) {
            image = images.reduce ((list, item) => {
                if (item.size === size) {
                    list.push(item);
                }

                return list;
            }, []) [0];
        }

        image = image || images [0];

        if (image) {
            return (
                <div className="thumbnail">
                    <img src={image.url} />
                </div>
            )
        }
    }
}

export default Thumbnail