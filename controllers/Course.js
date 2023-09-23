const Course = require('../models/Course');
const User = require('../models/User');
const Tags = require('../models/Tags');
const {uploadImageToCloudinary} = require('../utils/imageUpload');

exports.createCourse = async (req, res) => {

    try{
        const {
            course_name, 
            course_description, 
            what_will_you_learn,
            price,
            tag
        } = req.body;

        const thumbnail = req.files.thumbnailImage;

        if(!course_name || !course_description || !what_will_you_learn || !price || !tag || !thumbnail){
            return res.status(403).json({
                success : false,
                message : "All fields are required"
            });
        }

        const userId = req.user.id;
        const instructor = await User.findById(userId);
        console.log('Instructor Details : ', instructorDetails);

        if(!instructor){
            return res.status(403).json({
                success : false,
                message : "Instructor not found"
            });
        }

        const tagDetails = await Tags.findById(tag);

        if(!tagDetails){
            return res.status(403).json({
                success : false,
                message : "Tag details not found"
            });
        }

        const thumbnailImage  = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            course_name : course_name,
            course_description : course_description,
            instructor : instructor._id,
            what_will_you_learn : what_will_you_learn,
            price : price,
            tag : tagDetails._id,
            thumbnail : thumbnailImage.secure_url
        });


        await User.findByIdAndUpdate(
            {_id : instructor._id},
            {
                $push : {
                    courses : newCourse._id
                }
            },
            {new : true});
        
        return res.status(200).json({
            success : true,
            message : "Course successfully created",
            data : newCourse
        });
    }catch(error){

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error occured while creating new course",
            error : error.message
        });

    }

}

exports.getAllCourses = async (req, res) =>{
    try{

        const allCourses = await Course.find({}, {
            course_name : true, 
            course_description : true, 
            instructor,
            what_will_you_learn : true,
            price : true,
            thumbnail : true})
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success : true,
            message : "All course successfully fetched",
            data : allCourses
        });

    }catch(error){

        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching all courses",
            error : error.message
        })

    }
}