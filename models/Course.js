const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    course_name : {
        type : String,
        trim : true,
        required : true
    },
    course_description : {
        type : String,
        trim: true,
        required : true
    },
    instructor : {
        type : String,
        required: true
    },
    what_will_you_learn : {
        type : String
    },
    course_content : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
    },
    rating_and_reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReviews"
        }
    ],
    price : {
        type : Number,
        trim : true,
        required : true
    },
    thumbnail : {
        type : String,
    },
    tags : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tags"
    },
    students_enrolled : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }

});

module.exports = mongoose.model('Course', courseSchema);