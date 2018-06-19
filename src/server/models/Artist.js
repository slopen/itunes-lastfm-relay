// @flow

import mongoose from 'mongoose';

import type {MongoId, MongooseDocument} from 'mongoose';

export type ArtistMongooseDoc = MongooseDocument & {
    url: string,
    bio: {
        published: string,
        summary: string
    },
    stats: {
        listeners: number,
        playcount: number
    },
    name: string,
    similar: Array <MongoId>,
    tags: Array <MongoId>,
    image: Array <{
        url: string,
        size: string
    }>
};

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const trackSchema = new Schema ({
    _id: false,
    name: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    length: {
        type: Number
    },
    year: {
        type: Number
    },
    bitrate: {
        type: Number
    },
    path: {
        type: String,
        unique: true
    }
});

const artistSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    tracks: [trackSchema],

    tags: [{
        type: ObjectId,
        ref: 'Tag'
    }],
    tagsLFM: [String],

    similar: [{
        type: ObjectId,
        ref: 'Artist'
    }],
    similarLFM: [String],

    image: [{
        _id: false,
        url: String,
        size: String
    }],
    url: String,
    bio: {
        published: Date,
        summary: String
    },
    stats: {
        listeners: Number,
        playcount: Number
    }
}, {
    versionKey: false
});

export default mongoose.model ('Artist', artistSchema)