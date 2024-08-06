import mongoose from 'mongoose';
import apiResponce from '../utils/apiResponce.js';

const connectDB = async (url) => {
    try {  
        const dbOptions = {
            dbName : "NodeTest",
        };
        await mongoose.connect(url,dbOptions);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(error.message);
        return apiResponce(false, 500, "Database not connected",error.message);
    };
};

export default connectDB