const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;
const saltRounds = 10;


const uschema = new schema({

    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    birthdate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                // Regular expression for email validation
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
        }
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    password: {
        type: String,
        required: true

    }
});
// To Encrypt Password while adding new data
uschema.pre('save', async function (value) {
    const data = this;
    console.log(data, " i am hear");


    if (!data.isModified('password')) {
        return value();
    }
    try {
        const hashPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashPassword;

    } catch (err) {
        return value(err);
    }

})

// To Encrypt Password after updating password data
uschema.pre('findOneAndUpdate', async function (value) {
    const password = this.get("password");
    // console.log(password);
    // const data=this;
    // console.log(data._update.password, "Password data");

    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // console.log(hashPassword)
        this.set('password', hashPassword)

    } catch (err) {
        return value(err);
    }

})

const usermodel = mongoose.model('usersss', uschema);
module.exports = usermodel;