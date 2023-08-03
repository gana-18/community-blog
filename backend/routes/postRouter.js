const express=require('express')
const router=express.Router()
const {createPost,getPost}=require('../controllers/postControllers')
const {ensureAuth,ensureGuest}=require('../middleware/auth')

// @desc CREATE POST
// @Method POST
router.post('/create/:id',createPost)

// @desc GET POST BY ID OF USER
// @Method GET
router.get('/:id',getPost)

// @desc UPDATE POST BY ID OF USER
// @Method PUT
router.put('/user/:id',ensureAuth,(req,res)=>{
    res.send("update post by id")
})

// @desc DELETE POST BY ID OF USER
// @Method DELETE
router.delete('/user/:id',ensureAuth,(req,res)=>{
    res.send("delete post by id")
})

module.exports=router