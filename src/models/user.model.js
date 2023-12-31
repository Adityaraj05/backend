import mongoose, {Schema} from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avtar:{
            type: String,  // cloudinary url same like aws jaha par file or video upload karte hain and url ka use karte hai 
            required: true,
        },
        coverImage:{
            type: String  // cloudinary url same like aws jaha par file or video upload karte hain and url ka use 
        },
        watchHistroy:[
            {
                types:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
         password:{
            type:String,
            requires:[true, 'Password is required']
         },
         refersToken:{
            type:String
         }

    },
    {
        timestamps:true
    }
)


// it will encrypt the password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// checking the password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)  // it will return true or false password is match or not 

}

// jwt tokens


userSchema.method.generateAccessToken= function(){
    return jwt.sign(
        {
        _id: this._id, 
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    )
}
userSchema.method.generateRefreshToken= function(){
    return jwt.sign(
        {
        _id: this._id, 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    
    )
}

export const User = mongoose.model("User", userSchema)