const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/r_notebook";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connect to mongoose");
    })
}
module.exports=connectToMongo;