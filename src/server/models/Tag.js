// @flow

import mongoose from 'mongoose';

import type {MongoId, MongooseDocument} from 'mongoose';

export type TagMongooseDoc = MongooseDocument & {
    name: String,
    artists: Array <MongoId>,
    similar: Array <MongoId>
};

const ObjectId = mongoose.Schema.Types.ObjectId;

const tagSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    artists: [{
        type: ObjectId,
        ref: 'Artist'
    }],
    similar: [{
        type: ObjectId,
        ref: 'Tag'
    }]
}, {versionKey: false});

export default mongoose.model ('Tag', tagSchema)