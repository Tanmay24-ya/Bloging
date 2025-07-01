const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

module.exports = model('blog', blogSchema);
