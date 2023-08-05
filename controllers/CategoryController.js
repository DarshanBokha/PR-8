const categorytbl = require('../models/categorytbl')
const subcategorytbl = require('../models/SubCategorytbl')
const exsubcategorytbl = require('../models/ExSubCategorytbl')

const category = async (req,res)=>{
    try {
        let categorydata = await categorytbl.find({});
        if(categorydata){
            return res.render('category',{
                categorydata,
                single : ""
            });
        }
        else{
            console.log('record not found');
            return false
        }
    } 
    catch (err) {
        if(err){
            console.log(err);
            return false
        }
    }
}

const addcategory = async(req,res)=>{
    try {
        const {editid,category} = req.body
        if(editid){
            let editdata = await categorytbl.findByIdAndUpdate(editid,{
                category : category
            })
            if(editdata){
                req.flash('success',"Category Update Successfull")
                console.log("Category Update Successfull");
                return res.redirect('/category');
            }
            else{
                console.log("Category not Update");
                return false
            }
        }
        else{
            let addcategory = await categorytbl.create({
                category : category
            })
            if(addcategory){
                req.flash('success',"Category Add Successfully")
                console.log("Category Add Successfully");
                return res.redirect('back')
            }
            else{
                console.log("Category Not Add");
                return res.redirect('back')
            }
        }
    } 
    catch (err) {
        if(err){
            console.log(err);
            return false
        }
    }
}

const deletecategory = async(req,res)=>{
    try {
        let id = req.query.id
        let dltdata = await categorytbl.findByIdAndDelete(id);
        if(dltdata){
            req.flash('success',"Delete Successful")
            console.log("Delete Successful");
            return res.redirect('back');
        }
        else{
            console.log("data not delete");
            return res.redirect('back');
        }
    } 
    catch (err) {
        if(err){
            console.log(err);
            return false
        }
    }
}

const editcategory = async(req,res)=>{
    try {
        let id = req.query.id;
        let single = await categorytbl.findById(id);
        let alldata = await categorytbl.find({})
        if(single){
            return res.render('category',{
                single,
                categorydata : alldata
            })
        }
        else{
            console.log("record not found");
            return false
        }
    } 
    catch (err) {
        if(err){
            console.log(err);
            return false
        }
    }
}

module.exports = {
    category,
    addcategory,
    deletecategory,
    editcategory
}