// @flow

import {getSchema} from '@risingstack/graffiti-mongoose';

import config from 'config';
import Tag from 'server/models/Tag';
import Artist from 'server/models/Artist';


export default getSchema ([Artist, Tag], config.graffiti);
