const categorytbl = require('../models/categorytbl')

const subcategorytbl = require('../models/SubCategorytbl')

const exsubcategorytbl = require('../models/ExSubCategorytbl')

const ExSubCategory = async(req,res)=>{
    try {
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let mergeExsubcatTbl = await exsubcategorytbl.find({}).populate('subcategoryId').populate('categoryId')
        return res.render('ExSubCategory',{
            category,
            subcategory,
            mergeExsubcatTbl
        })
    } 
    catch (error) {
        return false
    }
}

const AddExSubcategory = async(req,res)=>{
    try {
        const {category,subcategory,exsubcategory} = req.body
        let addexsubcategory = await exsubcategorytbl.create({
            categoryId : category,
            subcategoryId : subcategory,
            exsubcategory : exsubcategory
        }) 
        if(addexsubcategory){
            console.log("Extrasubcategory successfully add");
            return res.redirect('back')
        }
        else{
            console.log("Something went Wrong");
            return res.redirect('back')
        }
    } 
    catch (err) {
        return false
    }
}

const excatdelete = async(req,res)=>{
    try {
        let id = req.query.id
        let deletedata = await exsubcategorytbl.findByIdAndDelete(id)
        if(deletedata){
            console.log("delete Successfully");
            return res.redirect('back')
        }
    } 
    catch (error) {
        console.log(error);
        return false
    }
}

const excatEdit = async(req,res)=>{
    try {
        let id = req.query.id
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let exsubcategory = await exsubcategorytbl.find({}).populate('categoryId').populate('subcategoryId')
        let single = await exsubcategorytbl.findById(id);
        console.log(single);
        if(single){
            return res.render('exsubcatEdit',{
                single,
                category,
                subcategory,
                exsubcategory
            })
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

const postExedit = async (req,res)=>{
    try {
        const {editid,exsubcategory} = req.body
        let editdata = await exsubcategorytbl.findByIdAndUpdate(editid,{
            exsubcategory : exsubcategory
        })
        if(editdata){
            console.log("Edit Successfull");
            return res.redirect('/ExSubCategory')
        }
        else{
            console.log("Edit Error");
            return res.redirect('back')
        }
    } 
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    ExSubCategory,
    AddExSubcategory,
    excatEdit,
    postExedit,
    excatdelete
}