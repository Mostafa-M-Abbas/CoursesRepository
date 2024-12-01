require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));


const coursesRouter = require('./routes/courses.routes'); 
const usersRouter = require('./routes/users.routes'); 

app.use(express.json());

app.use('/api/courses', coursesRouter); 

app.use('/api/users', usersRouter);  

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
})

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

