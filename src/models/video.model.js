import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    { 
        videoFile:{
            type:string,  // cloudinary url same like aws jaha par file or video upload karte hain and url ka use 
            required:true
        }, 
        thumbnail:{
            type:string,  // cloudinary url same like aws jaha par file or video upload karte hain and url ka use 
            required:true
        },
        title:{
            type:string,  
            required:true
        },
        description:{
            type:string,  
        },
        duration:{
            type:Number,  // cloudinary url same like aws jaha par file or video upload karte hain and url ka use 
            required:true
        },
        views:{
            type:string,  
            default:0
        },
        isPublished:{
            type:Boolen,  
            default:true
        },
        onwer:{
            type:Schema.Types.ObjectId,
            ref:"User"  
        }

},
{
    timestamps:true

}

)

videoSchema.plugin(mongooseAggregatePaginate)




export const Video = mongoose.model("Video", videoSchema)