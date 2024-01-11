const model = require("../models/user");

//  Add new data
exports.adddata = async (req, res) => {
  try {
    await model.create(({ userName, email, birthdate, age, password } = req.body));
    res.status(201).send("Data Added sucessfully");
  } catch (err) {
    res.status(400).send(" Error in data Creation :" + err.message);
  }
};

// View the user data

exports.viewuser = async (req, res) => {
  try {
    const data = await model.findById(req.params.userId).lean();
    res
      .status(201)
      .send(
        "Hear is My Details : \n   Name : " +
          data.name +
          "\n Email :" +
          data.email +
          "\n Age : " +
          data.age +
          "\n Birthdate : " +
          data.birthdate
      );
  } catch (err) {
    res.send(err.message + "Fetching data is unsucessfull").status(400);
  }
};

// Update the data using id

exports.updatedata = async (req, res) => {
  try {
    await model.findOneAndUpdate(
      { _id: req.params.userId },
      ({ userName, email, birthdate, age, password } = req.body)
    );
    res.status(201).send("Data Updated sucessful");
  } catch (err) {
    res.status(400).send(err.message + "Error in data Updation");
  }
};

//  Delete data

exports.deletedata = async (req, res) => {
  const userId = req.params.userId;
  try {
    await model.findByIdAndDelete(userId);
    res.status(200).send("data deleted sucessfully");
  } catch (err) {
    res.status(400).send(err.message + "Data Deletion Unsucessufl");
  }
};
