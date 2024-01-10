const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
            validator: function (value) {
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

const usermodel = mongoose.model('usersss', uschema);
module.exports = usermodel;