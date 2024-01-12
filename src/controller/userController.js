const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Add new data
exports.adddata = async (req, res) => {
  try {
    const { userName, email, age, birthdate, password } = req.body;
    await userModel.create({ userName, email, birthdate, age, password });
    res.status(201).send("Data Added sucessfully");
  } catch (err) {
    res.status(400).send(" Error in data Creation :" + err.message);
  }
};

// View the user data
exports.viewuser = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.userId).lean();
    res
      .status(201)
      .send(
        "Hear is My Details : \n   Name : " +
          data.userName +
          "\n Email :" +
          data.email +
          "\n Age : " +
          data.age +
          "\n Birthdate : " +
          data.birthdate
      );
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};

// Update the data using id
exports.updatedata = async (req, res) => {
  try {
    const { userName, email, birthdate, age, password } = req.body;

    await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      { userName, email, birthdate, age, password }
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
    await userModel.findByIdAndDelete(userId);
    res.status(200).send("data deleted sucessfully");
  } catch (err) {
    res.status(400).send(err.message + "Data Deletion Unsucessufl");
  }
};

// Login cheak
exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userData = await userModel.findOne({ userName: userName });

    if (!userData) {
      return res.status(401).send("Inserted User Not Found");
    }

    // Compare
    const passwordValidation = await bcrypt.compare(
      password,
      userData.password
    );

    if (passwordValidation) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: userData._id, username: userData.userName },
        process.env.SECRETKEY
      );

      // Setting cookie
      res.cookie("jwtToken", token, { httpOnly: true });

      res.status(200).send(`Login successful`);
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.log("Error in login");
    res.send(`Error in login :- ${error}`);
  }
};

// Logout
exports.logout = async (req, res) => {
  res.cookie("jwtToken", "", { expires: new Date(0) }).send("Logout Sucessful");
};
