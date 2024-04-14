const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        content: {
            type: String,
            required: [true, "content is required"],
        },
        postedBy: {
            type: String,
            // ref: "User",
        },
    },
);

module.exports = mongoose.model('Post', postSchema);