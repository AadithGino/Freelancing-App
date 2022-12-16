const { response } = require("express");
const projectSchema = require("../../models/projectSchema");
const { ObjectId } = require("mongodb");

exports.addNotesPost = async (req, res) => {
  try {
    req.query.id;
    const details = {
      userid: req.query.id,
      title: req.body.title,
      description: req.body.description,
    };

    projectSchema
      .create(details)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
    console.log(details);
  } catch (error) {}
};

exports.getNotesPost = async (req, res) => {
  console.log(req.query.id + "THIS IS ID ");
  try {
    projectSchema.find({ userid: req.query.id }).then((data) => {
      res.status(200).json(data);
    });
  } catch (Error) {
    res.status(400).json(Error.message);
  }
};

exports.deletenote = async (req, res) => {
  let id = req.query.id;
  try {
    projectSchema
      .deleteOne({ _id: id })
      .then((data) => {
        res.status(200).json("SUCCESSS FULLY DELETED");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {}
};

let singleproductid;

exports.singleprojectview = async (req, res) => {
  if (req.query.id != "hu") {
    singleproductid = req.query.id;
  }
  console.log(singleproductid + "THIS SHOULD BE THE ID");
  try {
    projectSchema.findOne({ _id: singleproductid }).then((data) => {
      projectSchema
        .aggregate([
          {
            $match: { _id: ObjectId(singleproductid) },
          },
          {
            $unwind: "$freelancers",
          },
          {
            $project: { users: "$freelancers.user" },
          },
          {
            $lookup: {
              from: "admins",
              localField: "users",
              foreignField: "_id",
              as: "users",
            },
          },
        ])
        .then((result) => {
          console.log(result);
          console.log("this ab "); 
          console.log(data);
          let details = {
            title:data.title, 
            description:data.description,
            time:data.time, 
            freelancers:result
          }
          res.status(200).json(details)
        });
    });
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};
