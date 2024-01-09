const mongoose = require('mongoose');
const schema = mongoose.Schema;

const uschema = new schema({

    name: 'String',
    email: 'String',

});

const usermodel = mongoose.model('usersss', uschema);
module.exports = usermodel;