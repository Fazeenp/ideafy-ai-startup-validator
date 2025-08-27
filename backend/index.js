import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || "";

app.get('/api/health',(req,res)=>{
    res.json({status:"ok",message:"Backend running"})
})

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB Error", err))


