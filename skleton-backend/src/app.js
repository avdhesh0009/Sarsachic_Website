import express from 'express';
import cors from 'cors'; 
import productRoutes from './routes/product.routes.js'; 

const app = express();
import cookieParser from "cookie-parser"

app.use(cookieParser())


app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  }));

app.use(express.json());
app.use('/api/v1/products', productRoutes);

export default app;



// import express from "express"
// import cors from "cors"
// const bodyParser = require('body-parser');

// const app = express()

//routes import
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import promotionRouter from './routes/promotion.routes.js'
import addressRouter from './routes/address.routes.js'
import productRouter from './routes/product.routes.js'

//routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/promotion",promotionRouter);
app.use("/api/v1/shipping",addressRouter);
app.use("/api/v1/products",productRouter);

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(bodyParser.json());

// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())


// //routes import
// import userRouter from './routes/user.routes.js'
// const productRoutes = require('./routes/products.routes.js');


// //routes declaration
// app.use("/api/v1/users", userRouter)
// app.use('/api/products', productRoutes);

// // http://localhost:8000/api/v1/users/register

// export { app }