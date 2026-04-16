import mongoose from "mongoose";


const trainingSchema = new mongoose.Schema({
    user : mongoose.Schema.Types.ObjectId,
    animal : mongoose.Schema.Types.ObjectId,
    title : String, 
    date : Date, 
    description : String, 
    hours : mongoose.Schema.Types.Number,


});

export default mongoose.models.Training || mongoose.model("Training", trainingSchema);
