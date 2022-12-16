const adminSchema = require("../../models/adminSchema")
const bcrypt = require("bcrypt")
const generateToken = require("../../utils/generatetoken")

exports.SignUpPost = async(req,res)=>{
    console.log(req.body.email);
    try {
        
        let details = {
            Name,
            number,
            email,
            password
        }=req.body
        details.password= await bcrypt.hash(req.body.password,10)
        adminSchema.findOne({email:details.email,number:details.number}).then((result)=>{
            console.log(result);
            if(result){
                res.status(400).json("Email Or Number Exists")
            }else{
                adminSchema.create(details).then((result)=>{
                    let details = {
                        firstname : result.firstname,
                        lastname : result.lastname,
                        email:result.email,
                        token:generateToken(result.id)
                    }
                    res.status(201).json(details)
                    console.log(result);
                }).catch((err)=>{
                    res.status(400)
                    
                    console.log(err);
                })
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}