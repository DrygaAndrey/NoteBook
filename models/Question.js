const { Schema, model } = require('mongoose');

const schema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
})
module.exports = model('Question', schema);