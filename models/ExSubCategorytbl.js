const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'categoryCrud'
    },
    subcategoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategory : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('exsubcategory',crudschema)

module.exports = crud