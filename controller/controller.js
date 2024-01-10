const model = require('../models/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//  Add new data
exports.adddata = async (req, res) => {

    const userName = req.body.name;
    const userEmail = req.body.email;
    const userAge = req.body.age;
    const userBdate = req.body.birthdate;
    const userPassword = req.body.password;

    console.log(".............data is ", req.body.name);
    try {
        // throw new Error('test error');
        await model.create(
            {
                name: userName,
                email: userEmail,
                birthdate: userBdate,
                age: userAge,
                password: userPassword,

            }
        )
        res.status(201).send("Data Added sucessfully");

    } catch (err) {
        console.log(".................." + err.message);
        // console.log(Object.keys(res))
        // return new Error("sasdsa")
        res.send(" Error in data Creation :" + err.message).status(400);
    }
};

// View the user data

exports.viewuser = async (req, res) => {
    console.log(req.body.name);
    const username = req.body.name;
    try {
        const data = await model.findOne({ name: username }).lean();
        console.log(data);

        res.send("Hear is My Details : \n   Name : " + data.name + "\n Email :" + data.email + "\n Age : " + data.age + "\n Birthdate : " + data.birthdate).status(201);

    } catch (err) {
        res.send(err.message + 'Fetching data is unsucessfull').status(400);
    }
}

// Update the data using id 

exports.updatedata = async (req, res) => {

    const id = req.body.id;
    const newname = req.body.name;
    const newemail = req.body.email;
    const newAge = req.body.age;
    const newBdate = req.body.birthdate;
    const newPassword = req.body.password;

    try {
        const data = await model.findByIdAndUpdate(id, {
            name: newname,
            email: newemail,
            birthdate: newBdate,
            age: newAge,
            password: newPassword,
        })
        res.send('Data Updated sucessful').status(201);
    } catch (err) {
        res.send(err.message + "Error in data Updation").status(400);
    }
}


//  Delete data

exports.deletedata = async (res) => {
    try {
        const data = await model.findByIdAndDelete('659e23425779ce3065d1b545');
        res.send("data deleted sucessfully").status(200);;
    } catch (err) {
        res.send(err.message + 'Data Deletion Unsucessufl').status(400);;
    }
}