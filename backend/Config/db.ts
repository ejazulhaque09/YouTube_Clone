import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DB_URL as string;

if(!dbUrl) {
    console.error('DB_URL is not defined');
    process.exit(1);
}

// database connection
mongoose.connect(dbUrl)
    .then(() => console.log('DataBase Connected Successfully'))
    .catch((err: Error) => console.log(err, 'Error in connecting DB'));

export default mongoose;
