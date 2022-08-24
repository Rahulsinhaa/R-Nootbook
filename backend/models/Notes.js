const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoose = require('mongoose');
const NotesSchema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
      
    },
    tag:{
        type:String,
        defalult:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }

  });
  const User=mongoose.model('notes',NotesSchema);
  module.exports=User;