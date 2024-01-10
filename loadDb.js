const { default: mongoose } = require("mongoose");

exports.startServer = async () => {

    // Handling connection events
    try {
        mongoose.connect(process.env.MONGODB_CONNNECTION_LINK).then(() => {
            console.log("DB Connected");
           
        });

        const db = mongoose.connection;
        
        db.on('connected', (error) => {
            console.error(`MongoDB connection`);
        });
        db.on('disconnected', (error) => {
            console.error(`MongoDB connection error: ${error}`);
        });
        

    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
    
    }





}