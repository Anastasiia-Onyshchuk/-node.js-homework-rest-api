import mongoose from "mongoose";
import app from "./app.js";
// udmwJMz0LUXluSbI
const DB_HOST = "mongodb+srv://Anastasiia:udmwJMz0LUXluSbI@cluster-hw3.gb2gq.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
})
   })
  .catch(error => {
    console.log(error.message);
  process.exit(1)
})
