import mongoose from 'mongoose';

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
}, {
    versionKey: false
});

export default mongoose.model ('Tag', tagSchema)