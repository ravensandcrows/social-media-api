const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//schema to create user model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 300
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    //indicating we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;
