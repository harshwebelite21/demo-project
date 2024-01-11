const model = require('../models/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Number of rounds For hashing password
const saltRounds = 10;

//  Add new data
exports.adddata = async (req, res) => {

    const { name: userName, email: userEmail, age: userAge, birthdate: userBdate, password: password } = req.body;
    // To encrypt Password
    
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await model.create(
            {
                name: userName,
                email: userEmail,
                birthdate: userBdate,
                age: userAge,
                password: hashPassword,
            }
        )
        res.status(201).send("Data Added sucessfully");

    } catch (err) {
        res.send(" Error in data Creation :" + err.message).status(400);
    }
};

// View the user data

exports.viewuser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await model.findById(userId).lean();
        res.send("Hear is My Details : \n   Name : " + data.name + "\n Email :" + data.email + "\n Age : " + data.age + "\n Birthdate : " + data.birthdate).status(201);

    } catch (err) {
        res.send(err.message + 'Fetching data is unsucessfull').status(400);
    }
}

// Update the data using id 

exports.updatedata = async (req, res) => {
    const userId = req.params.userId;

    const { name: newname, email: newemail, age: newAge, birthdate: newBdate, password: password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const data = await model.findByIdAndUpdate(userId, {
            name: newname,
            email: newemail,
            birthdate: newBdate,
            age: newAge,
            password: hashPassword,
        })
        res.send('Data Updated sucessful').status(201);
    } catch (err) {
        res.send(err.message + "Error in data Updation").status(400);
    }
}

//  Delete data

exports.deletedata = async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await model.findByIdAndDelete(userId);
        res.send("data deleted sucessfully").status(200);;
    } catch (err) {
        res.send(err.message + 'Data Deletion Unsucessufl').status(400);;
    }
}