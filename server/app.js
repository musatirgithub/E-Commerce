require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const path = require('path');


// database
const connectDB = require('./db/connect');

// other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// security packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


// router requires
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');


// middleware requires
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// security package invoke
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs:1000*60*15,
        max:60,
    })
);
app.use(helmet());
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,
}
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

// express.json, cookieParser
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// static + fileUpload
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(fileUpload());

// router uses
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);


// notFound & Error uses
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>
        console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
};

start();