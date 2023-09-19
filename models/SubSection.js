const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({

    title : {
        type : String,
    },
    time_duration : {
        type : String
    },
    description : {
        type : String
    },
    video_url : {
        type : String
    }

});

module.exports = mongoose.model('SubSection', subSectionSchema);