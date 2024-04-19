import express from 'express';
import  mongoose  from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb database ...');
}).catch((err)=>{
    console.log(err);
});

//routing

app.use('/server/user', userRoutes);

app.use('/server/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT} ...`);
});
