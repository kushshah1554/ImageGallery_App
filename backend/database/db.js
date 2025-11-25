const mongoose=require("mongoose");

const connectToDataBase=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connect to database successfully");
        
    } catch (error) {
        console.log("Can not connect to datbase!!!!!",error);
        process.exit(1);
    }
};

module.exports=connectToDataBase;