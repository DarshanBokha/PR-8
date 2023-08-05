const express = require('express')

const routes = express.Router();

const passport = require('passport')

const fileupload = require('../config/fileupload')

const Admincontroller = require('../controllers/AdminController')
const CategoryController = require('../controllers/CategoryController')
const SubCategoryController = require('../controllers/SubCategoryController')
const ExSubCategoryController = require('../controllers/ExSubCategoryController')
const ProductController = require('../controllers/ProductController')

routes.get('/',Admincontroller.login);
routes.get('/register',Admincontroller.register)
routes.get('/dashboard',passport.checkAuthentication,Admincontroller.dashboard)
routes.post('/registerData',Admincontroller.registerData)
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),Admincontroller.loginData);
routes.get('/logout',Admincontroller.logout),
routes.get('/newpassword',passport.checkAuthentication,Admincontroller.newpassword)
routes.post('/Setnewpassword',Admincontroller.Setnewpassword)
routes.get('/profile',passport.checkAuthentication,Admincontroller.profile)
routes.post('/changeprofile',Admincontroller.changeprofile)
routes.post('/forgotpassword',Admincontroller.forgotpassword)
routes.get('/otp',Admincontroller.otp)
routes.post('/enterotp',Admincontroller.enterotp)
routes.get('/loginNewpassword',Admincontroller.loginNewpass)
routes.post('/newpass',Admincontroller.newpass)

// Category Routes
routes.get('/category',passport.checkAuthentication,CategoryController.category)
routes.post('/addcategory',CategoryController.addcategory)
routes.get('/deletecategory',CategoryController.deletecategory)
routes.get('/editcategory',CategoryController.editcategory)


//SubCategory Routes
routes.get('/addSubCategory',passport.checkAuthentication,SubCategoryController.addSubCategory)
routes.post('/postSubcategory',SubCategoryController.postSubcategory)
routes.get('/editsubcat',passport.checkAuthentication,SubCategoryController.editsubcat)
routes.post('/postsubedit',SubCategoryController.postsubcat)
routes.get('/dltsubcat',SubCategoryController.dltsubcat)


//ExSubCategory Routes
routes.get('/ExSubCategory',passport.checkAuthentication,ExSubCategoryController.ExSubCategory)
routes.post('/AddExSubcategory',ExSubCategoryController.AddExSubcategory)
routes.get('/excatEdit',passport.checkAuthentication,ExSubCategoryController.excatEdit)
routes.post('/postExedit',ExSubCategoryController.postExedit)
routes.get('/excatDelete',ExSubCategoryController.excatdelete)

//Product
routes.get('/product',passport.checkAuthentication,ProductController.product)
routes.post('/addproduct',fileupload,ProductController.addproduct),
routes.get('/editproduct',passport.checkAuthentication,ProductController.editproduct)
routes.post('/postEditproduct',fileupload,ProductController.postEditproduct)

module.exports = routes