import dotenv  from 'dotenv'
dotenv.config();
import express from 'express';
import dbConnect from '../config/db/dbConnect.js';
import userRoutes from '../routes/user.js';
import { globalErrhandler, notFound } from '../middlewares/globalErrHandler.js';

dbConnect();
const app = express();
//Middleware
app.use(express.json());
//User route
app.use("/api/users", userRoutes);
//Error Handling Middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;

