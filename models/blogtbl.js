const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    discription : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('BlogCrud',crudschema);

module.exports = crud;