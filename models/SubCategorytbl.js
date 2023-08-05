const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'categoryCrud'
    },
    subcategory : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('subcategory',crudschema)

module.exports = crud