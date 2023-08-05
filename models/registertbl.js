const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('crud',crudschema);

module.exports = crud;