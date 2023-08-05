const categorytbl = require('../models/categorytbl')
const subcategorytbl = require('../models/SubCategorytbl')
const exsubcategorytbl = require('../models/ExSubCategorytbl')
const productTbl = require('../models/ProductTbl')

const fs = require('fs')

const product = async (req, res) => {
    try {
        let category = await categorytbl.find({})
        let subcategory = await subcategorytbl.find({})
        let exsubcategory = await exsubcategorytbl.find({})
        let product = await productTbl.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')
        return res.render('product', {
            category,
            subcategory,
            exsubcategory,
            product
        })
    }
    catch (error) {
        console.log(error);
        return false
    }
}

const addproduct = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory, product, price, quantity, discription } = req.body
        let image = "";
        if(req.file){
            image = req.file.path
        }
        if(!category || !subcategory || !exsubcategory || !product || !price || !quantity || !discription){
            console.log("Some field are missing");
            return res.redirect('back')
        }
        else{
            let addproduct = await productTbl.create({
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                product: product,
                price: price,
                quantity: quantity,
                discription: discription,
                image : image
            })
            if (addproduct) {
                console.log("Product Insert seccessfully");
                return res.redirect('back')
            }
            else{
                console.log("error in insert");
                return res.redirect('back')
            }
        }
    }
    catch (error) {
        console.log(error);
        return false
    }
}

const editproduct = async(req,res)=>{
    try {
        let id = req.query.id
        let single = await productTbl.findById(id)
        let category = await categorytbl.find({})
        let subcategory = await subcategorytbl.find({})
        let exsubcategory = await exsubcategorytbl.find({})
        return res.render('editProduct',{
            single,
            category,
            subcategory,
            exsubcategory
        }) 
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

const postEditproduct = async(req,res)=>{
    try {
        const {editid,product,price,quantity,discription} = req.body
        console.log(req.file);
        if(req.file){
            let dltproimg = await productTbl.findById(editid)
            if(dltproimg){
                fs.unlinkSync(dltproimg.image)
            } 
            else{
                console.log("image not delete");
                return false
            }
            let image = "";
            if(req.file){
                image = req.file.path
            }
            let productedit = await productTbl.findByIdAndUpdate(editid,{
                product : product,
                price : price,
                quantity : quantity,
                discription : discription,
                image : image
            })
            if(productedit){
                console.log("Product Update Successfully");
                return res.redirect('product')
            }
            else{
                console.log("Product not Update");
                return res.redirect('back')
            }
        }
        else{
            image = "";
            let singledata = await productTbl.findById(editid);
            if(singledata){
                image = singledata.image;
                let productedit = await productTbl.findByIdAndUpdate(editid,{
                    product : product,
                    price : price,
                    quantity : quantity,
                    discription : discription,
                    image : image
                })
                if(productedit){
                    console.log("Product Update Successfully");
                    return res.redirect('product')
                }
                else{
                    console.log("Product not Update");
                    return res.redirect('back')
                } 
            }
        }
    } 
    catch (err) {
        console.log(err);
        return false
    }
}

module.exports = {
    product,
    addproduct,
    editproduct,
    postEditproduct
}