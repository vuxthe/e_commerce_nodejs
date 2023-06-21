import mongoose from 'mongoose'
import 'dotenv'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://vux123:123456vux@cluster0.6ivhjw1.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
        console.log("MongoDB connected: " + conn.connection.host)
    } catch (err) {
        console.log("Error " + err.message);
        process.exit(1)
    }

}

export default connectDB
