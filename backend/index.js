import express from "express";
const app = express();
import connectDB from "./db/connectDB.js";
import router from "./router/web.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin : 'http://localhost:3000',
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());
app.use('/',router);

const url = "mongodb://127.0.0.1:27017"
connectDB(url);

app.use('/',router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
