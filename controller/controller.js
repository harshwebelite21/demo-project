const model = require('../models/user');

//  Add new data
exports.adddata = async (req, res) => {

    const { name: name, email: email, age: age, birthdate: birthdate, password: password } = req.body;

    try {
        // To create New user 
        await model.create(
            {
                name: name,
                email: email,
                birthdate: birthdate,
                age: age,
                password: password,
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

    const { name: name, email: email, age: age, birthdate: birthdate, password: password } = req.body;

    try {
        await model.findOneAndUpdate({ _id: userId }, {
            name: name,
            email: email,
            birthdate: birthdate,
            age: age,
            password: password,
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