import multer from "multer";

// const express = require('express');
// const multer = require('multer');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"/public/tmp/my") //folder to save the files in  . cb ->callback
    },
    filename: function(req,file,cb){
       cb(null, file.originalname)
    }
})


export const upload = multer({
    storage,
})