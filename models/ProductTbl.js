const mongoose = require('mongoose')

const crudschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Types.ObjectId,
        ref : 'categoryCrud'
    },
    subcategoryId : {
        type :mongoose.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategoryId : {
        type :mongoose.Types.ObjectId,
        ref : 'exsubcategory'
    },
    product : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const crud = mongoose.model('product',crudschema)

module.exports = crud