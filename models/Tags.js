const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Course"
    }

});

module.exports = mongoose.model('Tags', tagsSchema);