const categorytbl = require('../models/categorytbl')

const SubCategorytbl = require('../models/SubCategorytbl')

const addSubCategory = async(req,res)=>{
    try {
        let category = await categorytbl.find({});

        let mergesubcatTbl = await SubCategorytbl.find({}).populate('categoryId')
        return res.render('sub_category',{
            category,
            mergesubcatTbl
        })
    } 
    catch (err) {
        return false
    }  
}

const postSubcategory = async(req,res)=>{
    try {
        const {category,subcategory} = req.body
        let addSubcategory = await SubCategorytbl.create({
            categoryId : category,
            subcategory : subcategory
        })
        if(addSubcategory){
            console.log("Subcategory Add Successfully");
            return res.redirect('back')
        }
        else{
            console.log("Subcategory Not Add");
            return res.redirect('back')
        }
    } 
    catch (err) {
        return false
    }
}

const dltsubcat = async(req,res)=>{
    try {
        let id = req.query.id
        let deletedata = await SubCategorytbl.findByIdAndDelete(id)
        if(deletedata){
            console.log("Delete Successfully");
            return res.redirect('back')
        }
    } 
    catch (error) {
        console.log(error);  
        return false 
    }
}

const editsubcat = async(req,res)=>{
    let category = await categorytbl.find({})
    // let subcatTbl = await SubCategorytbl.find({}).populate('categoryId')
    let id = req.query.id
    try {
        let single = await SubCategorytbl.findById(id);
        console.log(single);
        if(single){
            return res.render('subcatEdit',{
                single,
                category,
                // subcatTbl
            })
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

const postsubcat = async(req,res)=>{
    try {
        const {editid,subcategory} = req.body
        let editdata = await SubCategorytbl.findByIdAndUpdate(editid,{
            subcategory : subcategory
        })
        if(editdata){
            console.log("Edit Done");
            return res.redirect('/addSubCategory')
        }
        else{
            console.log("Edit error");
            return res.redirect('back')
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    addSubCategory,
    postSubcategory,
    editsubcat,
    postsubcat,
    dltsubcat
}