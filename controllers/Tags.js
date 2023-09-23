const Tags = require('../models/Tags');

exports.createTags = async (req, res) => {
    try{

        const {name, description} = req.body;

        if(!name || !description){
            return res.status(403).json({
                success : false,
                message : "All fields required",
            });
        }

        const newTag = await Tags.create({
            name: name,
            description : description
        });
        
        res.status(200).json({
            success : true,
            message : "Tag successfully created",
            data : newTag,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error occured at the time of creating tags",
            error : error.message
        });
    }
}

exports.getAllTags = async (req, res) =>{
    try{

        const allTags = await Tag.find({}, {name:true, description : true});

        res.status(200).json({
            success : true,
            message : "All tags fetched successfully"
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error occured at the time of fetching all tags",
            error : error.message
        });
    }
}