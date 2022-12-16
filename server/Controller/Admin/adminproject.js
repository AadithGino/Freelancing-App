const projectSchema = require("../../models/projectSchema")
const {ObjectId}  = require("mongodb") 


exports.freelancerHome = async(req,res)=>{
    try {
        projectSchema.find().then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json("Something Went Wrong")
    }
}


exports.freelancerApply = async(req,res)=>{
    console.log(req.body.user);
    try {
        let user = req.body.user
        let project = req.body.project
        projectSchema.updateOne({_id:project},{$push:{freelancers:{user:ObjectId(user)}}},function(err,doc){
            if(err){
                console.log(err);
            }
        })
        
    } catch (error) {
        
    }
}