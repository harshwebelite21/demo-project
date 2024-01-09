const model = require('../models/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//  Add new data
exports.adddata = async (req, res) => {

    const uname = req.body.name;
    const uemail = req.body.email;
    console.log(".............data is ", req.body.name);
    try {
        // throw new Error('test error');
        await model.create(
            {
                name: uname,
                email: uemail
            }
        )
        res.send("Data Added sucessfully").status(201);

    } catch (err) {
        console.log(".................." + err.message);
        res.send(err.message, 'Data Not Inserted').status(400);
    }
};

// View the user data

exports.viewuser = async (req,res) => {
    console.log(req.body.name);
    const username=req.body.name                                     ;
    try {
        const data = await model.findOne({name:username}).lean();
        console.log(data);

        res.send("My Name is : " + data.name + "and My Email Addres is :" + data.email ).status(201);

    } catch (err) {
        res.send(err.message , 'Fetching data is unsucessfull').status(400);
    }
}


// Update the data using id 

exports.updatedata = async (req, res) => {

    const id = req.body.id;
    const newname = req.body.name;
    const newemail = req.body.email;

    try {
        const data = await model.findByIdAndUpdate(id, {
            name: newname,
            email: newemail
        })
        res.send('Data Updated sucessful').status(201);
    } catch (err) {
        res.send(err.message, "Error in data Updation").status(400);;
    }
}


//  Delete data

exports.deletedata = async (res) => {
    try {
        const data = await model.findByIdAndDelete('659ce6de2200ce4efc8c5abc');
        res.send("data deleted sucessfully").status(200);;
    } catch (err) {
        res.send(err.message, 'Data Deletion Unsucessufl').status(400);;
    }
}